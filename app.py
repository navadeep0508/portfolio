from flask import Flask, render_template, request, jsonify, redirect, url_for, session, flash, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
import os
from datetime import datetime
import secrets

app = Flask(__name__)
app.config['SECRET_KEY'] = secrets.token_hex(16)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///portfolio.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

db = SQLAlchemy(app)

# Database Models
class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    tech_stack = db.Column(db.Text, nullable=False)  # JSON string
    github_link = db.Column(db.String(500))
    demo_link = db.Column(db.String(500))
    image_path = db.Column(db.String(500))
    featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'tech_stack': self.tech_stack.split(','),
            'github_link': self.github_link,
            'demo_link': self.demo_link,
            'image_path': self.image_path,
            'featured': self.featured,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/project/<int:project_id>')
def project_detail(project_id):
    return render_template('project_detail.html')

@app.route('/api/projects')
def get_projects():
    projects = Project.query.order_by(Project.featured.desc(), Project.created_at.desc()).all()
    return jsonify([project.to_dict() for project in projects])

@app.route('/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        name = data.get('name', '')
        email = data.get('email', '')
        message = data.get('message', '')
        
        # Here you would typically send an email or save to database
        # For now, we'll just return success
        return jsonify({'success': True, 'message': 'Message sent successfully!'})
    except Exception as e:
        return jsonify({'success': False, 'message': 'Error sending message'}), 500

# Admin Routes
@app.route('/admin')
def admin():
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    projects = Project.query.order_by(Project.created_at.desc()).all()
    return render_template('admin/dashboard.html', projects=projects)

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        admin = Admin.query.filter_by(username=username).first()
        if admin and admin.check_password(password):
            session['admin_logged_in'] = True
            session['admin_username'] = username
            flash('Login successful!', 'success')
            return redirect(url_for('admin'))
        else:
            flash('Invalid credentials', 'error')
    
    return render_template('admin/login.html')

@app.route('/admin/logout')
def admin_logout():
    session.clear()
    flash('Logged out successfully', 'success')
    return redirect(url_for('admin_login'))

@app.route('/admin/add_project', methods=['GET', 'POST'])
def add_project():
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    if request.method == 'POST':
        title = request.form.get('title')
        description = request.form.get('description')
        tech_stack = request.form.get('tech_stack')
        github_link = request.form.get('github_link')
        demo_link = request.form.get('demo_link')
        featured = request.form.get('featured') == 'on'
        
        # Handle file upload
        image_path = None
        if 'image' in request.files:
            file = request.files['image']
            if file and file.filename:
                filename = secure_filename(file.filename)
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(file_path)
                image_path = filename
        
        project = Project(
            title=title,
            description=description,
            tech_stack=tech_stack,
            github_link=github_link,
            demo_link=demo_link,
            image_path=image_path,
            featured=featured
        )
        
        db.session.add(project)
        db.session.commit()
        flash('Project added successfully!', 'success')
        return redirect(url_for('admin'))
    
    return render_template('admin/add_project.html')

@app.route('/admin/edit_project/<int:project_id>', methods=['GET', 'POST'])
def edit_project(project_id):
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    project = Project.query.get_or_404(project_id)
    
    if request.method == 'POST':
        project.title = request.form.get('title')
        project.description = request.form.get('description')
        project.tech_stack = request.form.get('tech_stack')
        project.github_link = request.form.get('github_link')
        project.demo_link = request.form.get('demo_link')
        project.featured = request.form.get('featured') == 'on'
        
        # Handle file upload
        if 'image' in request.files:
            file = request.files['image']
            if file and file.filename:
                filename = secure_filename(file.filename)
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(file_path)
                project.image_path = filename
        
        db.session.commit()
        flash('Project updated successfully!', 'success')
        return redirect(url_for('admin'))
    
    return render_template('admin/edit_project.html', project=project)

@app.route('/admin/delete_project/<int:project_id>')
def delete_project(project_id):
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    project = Project.query.get_or_404(project_id)
    
    # Delete image file if exists
    if project.image_path:
        image_file = os.path.join(app.config['UPLOAD_FOLDER'], project.image_path)
        if os.path.exists(image_file):
            os.remove(image_file)
    
    db.session.delete(project)
    db.session.commit()
    flash('Project deleted successfully!', 'success')
    return redirect(url_for('admin'))

# Serve uploaded files
@app.route('/static/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Create tables on app startup
with app.app_context():
    db.create_all()
    
    # Create default admin user if not exists
    admin = Admin.query.filter_by(username='admin').first()
    if not admin:
        admin = Admin(username='admin')
        admin.set_password('admin123')  # Change this in production
        db.session.add(admin)
        db.session.commit()

# Production environment check
if __name__ == '__main__':
    app.run(debug=True)
elif os.environ.get('RENDER'):
    # Render deployment
    pass
