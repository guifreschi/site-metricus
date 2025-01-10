[JAVASCRIPT__BADGE]: https://img.shields.io/badge/Javascript-000?style=for-the-badge&logo=javascript
[MY__SQL]: https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white

<h1 align="center" style="font-weight: bold;">Site Metricus 💻</h1>

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![javascript][JAVASCRIPT__BADGE]
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![mysql][MY__SQL]
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

<p align="center">
 <a href="#getting-started">Getting Started</a> •
  <a href="#features">Features</a> •
 <a href="#colab">Colab</a> •
 <a href="#contribute">Contribute</a>
</p>

<p align="center">
  <b>Site Metricus is a Flask-based web application designed for performing unit conversions with ease. It includes session management, history tracking, and supports Docker for simplified deployment.</b>
</p>

<h2 id="getting-started">🚀 Getting Started</h2>

<h3>Prerequisites</h3>

- Python 3.8+
- Flask
- SQLAlchemy
- Required dependencies listed in `requirements.txt`

<h3>Cloning the Repository</h3>

```bash
git clone https://github.com/guifreschi/site-metricus.git
cd site-metricus
```

<h3>Setting Up the Virtual Environment</h3>

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

<h3>Installing Dependencies</h3>

```bash
pip install -r requirements.txt
```

<h3>Setting Up the Database</h3>

```bash
flask shell
>>> db.create_all()
>>> db.session.commit()
>>> exit()
```

<h3>Configuring the Application</h3>

Update the `config.py` file in the `instance` folder with your preferred values.

<h3>Running the Application</h3>

Start the application in development mode:

```bash
python app.py
```

Access the app at `http://127.0.0.1:5000`.

<h3>Running with Docker</h3>

1. Ensure Docker is installed.
2. Run the following command to start the application:

```bash
docker-compose up
```

3. Access the app at `http://127.0.0.1:5000`.

To stop the application, use:

```bash
docker-compose down
```

<h2 id="features">✨ Features</h2>

- **Simple Unit Conversions**: Convert between various units with ease.
- **Complex Unit Conversions**: Handle more intricate conversions requiring multiple inputs.
- **User Session Management**: Unique sessions for every user to keep conversion history separate.
- **Conversion History**: View, delete, or clear past conversions.
- **Responsive Design**: Accessible via dynamic HTML templates rendered with Flask.

<h2 id="colab">🤝 Collaborators</h2>

No collaborators yet. Want to contribute? See the [Contribute](#contribute) section below!

<h2 id="contribute">📫 Contribute</h2>

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature/your-feature
```

3. Commit your changes following commit conventions.
4. Push to the branch:

```bash
git push origin feature/your-feature
```

5. Open a Pull Request explaining the problem solved or feature made.

<h3>Helpful Links</h3>

- [📝 How to create a Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request)
- [💾 Commit pattern](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)

