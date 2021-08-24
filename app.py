import os
from werkzeug.utils import secure_filename
from flask import Flask,render_template,session,request,redirect,url_for,jsonify,g
from flask_socketio import SocketIO, send
from flaskext.mysql import MySQL
import pymysql
from apis import api


app=Flask(__name__)

#apis
app.register_blueprint(api)

app.config["SECRET_KEY"]="secret"
socketio=SocketIO(app)
# Conexion a la BBDD
db=pymysql.connect(host='localhost',user='root', password='',db='CHAT')
MySQL(app)

app.secret_key='somesecretkeythantonlyishouldknow'
# Ruta para poner foto de las materias
app.config["UPLOAD_FOLDER"]="./static/media/materias"

@app.before_request
def before_request():
	g.user=None
	if "userid" in session:
		user = [x for x in users if x[0]==session["userid"]]
		g.user = user


class User:
    def __init__(self,id,username,password):
        self.id=id;
        self.username=username;
        self.password=password;

    def __repr__(self):
        return f'<User: {self.username}';


@app.route("/")
def index():#Ruta del Index
	if not g.user:
		return redirect(url_for("login"))
	ides=session["userid"]
	
	print(session["userid"],ides,"seccionnnes")
	db.ping()
	cursor = db.cursor()
	#SELECCIONANDO TODAS LAS MATERIAS EN LAS QUE SE ENCUENTRA EL USUARIO
	cursor.execute('SELECT * FROM usuarios WHERE id=%s',(session["userid"]))
	for x4 in cursor.fetchall():
		session["role"]=x4[6]

	
	#SELECCIONANDO LOS MENSAJES DEL GRUPO 
	if session["role"]=="e":
		cursor.execute('SELECT * FROM materia WHERE id IN (SELECT idGrupo FROM ESTUDIANTE WHERE idUser=%s)',(str(session["userid"])))
		
	else:
		cursor.execute('SELECT * FROM materia WHERE profesores LIKE "%'+str(session["userid"])+'%"')
	b=cursor.fetchall()

	contador=0

	for i3 in b:
		if contador==0:
			ideG=i3[0]
		contador+=1
	session["grupo"]=ideG
	grupo=session["grupo"]
	cursor.execute('SELECT * FROM MENSAJE WHERE grupo=%s',(grupo))
	c=cursor.fetchall()
	a=[]
	for i34 in c:
		i34=list(i34)
		ideU=i34[1]
		cursor.execute('SELECT * FROM USUARIOS WHERE id=%s',(ideU))
		for b34 in cursor.fetchall():
			i34.insert(4,b34[1])
			i34.insert(5,b34[6])
		a.append(i34)
	

	print(session["role"])
	cursor.connection.commit()
	lista=[]
	print(b)
	contador=0
	for i in b:
		listita=i[2].split(",")
		for f in listita:
			contador+=1
		newArray=list(i)
		newArray[2]=contador
		lista.append(newArray)
		contador=0
	return render_template("index.html",datos=a,ide=int(ides), materia=lista)

@app.route("/materias", methods=["POST","GET"])
def materias():#Vista Materias
	if not g.user:
		return redirect(url_for("login"))
	
	db.ping()
	cursor = db.cursor()
	if session["role"]=="p":
		cursor.execute('SELECT * FROM materia WHERE profesores LIKE "%'+str(session["userid"])+'%"')
	else:
		cursor.execute('SELECT * FROM materia WHERE id IN (SELECT idGrupo FROM ESTUDIANTE WHERE idUser=%s)',(str(session["userid"])))


	a=cursor.fetchall()
	cursor.connection.commit()
	lista=[]
	print(a)
	contador=0

	for i in a:
		ideGrupo=i[0]
		cursor.execute('SELECT * FROM ESTUDIANTE WHERE idGrupo=%s',([int(ideGrupo)]))

		for i1 in cursor.fetchall():
			contador+=1
		
		newArray=list(i)
		newArray[3]=contador# AGREGANDO AL NEWARRAY EL N° DE ALUMNOS
		lista.append(newArray)
		contador=0# RESETEANDO CONTADOR
	

	if session["role"]=="p":
		return render_template("materias.html", ide=session["userid"], materia=lista,role="p")
	else:
		return render_template("materias.html", ide=session["userid"], materia=lista,role="e")
		



@app.route("/CrearChat", methods=["POST"])
def CrearMateria():# CREANDO Materias 
	if not g.user:
		return redirect(url_for("login"))
	if request.method=="POST":
		materia=request.form["materia"]
		foto=request.files["foto"]
		
		foto2 = foto.filename or '' #OBTENIENDO EL NOMBRE DE LA FOTO
		# MOVIENDO IMAGEN A LA RUTA DE ARCHIVOS
		filename=secure_filename(foto.filename)
		foto.save(os.path.join(app.config["UPLOAD_FOLDER"],filename))
		alumnos=str(session["userid"])
		cursor = db.cursor()
		cursor.execute('INSERT INTO MATERIA (materias,profesores,fotos) VALUES (%s, %s, %s)', (materia,alumnos,foto2))
		cursor.connection.commit()
	return redirect(url_for("materias"))
	

@app.route("/Borrar/Materia", methods=["POST"])
def BorrarMateria():
	cursor = db.cursor()
	cursor.execute('DELETE FROM MATERIA WHERE id=%s', (request.form["idM"]))
	cursor.execute('DELETE FROM ESTUDIANTE WHERE idGRUPO=%s', (request.form["idM"]))
	cursor.connection.commit()
	return redirect(url_for("materias"))

@app.route("/Estudiantes", methods=["POST"])
def Estudiantes():# vista ESTUDIANTES
	if not g.user:
		return redirect(url_for("login"))
	ide=request.form["ideM"]
	db.ping()
	cursor = db.cursor()
	cursor.execute('SELECT * FROM MATERIA WHERE id=%s',(ide))
	a=cursor.fetchall()
	b=[]
	
	for i in a:
		ideGrupo=i[0]
	cursor.execute('SELECT * FROM ESTUDIANTE WHERE idGrupo=%s',([int(ideGrupo)]))
	try:
		a1=cursor.fetchall()
		for x2 in a1:	
			lista=list(x2)

			if len(x2[1])!=0:
				cursor.execute('SELECT * FROM USUARIOS WHERE id=%s',(str(x2[1])))
				for x3 in cursor.fetchall():
					lista.append(x3[3])
					lista.append(x3[4])
			else:
				lista.append("No Registrado")
				lista.append("No Registrado")

			
			b.append(list(lista))
	except IndexError:
		pass
	cursor.connection.commit()

	
	materias=a[0][1]
	
	if session["role"]=="p":
		return render_template("alumno.html",ides=ide, ide=session["userid"], estudiantes=b,materia=materias,role="p")
	else:
		return render_template("alumno.html",ides=ide, ide=session["userid"], estudiantes=b,materia=materias,role="e")
		

	

@app.route("/Crear/Estudiante/<ide>", methods=["POST"])
def CrearEstudiante(ide):
	
	db.ping()
	cursor = db.cursor()
	ideUser=""
	cursor.execute('SELECT * FROM USUARIOS WHERE cedula=%s',(str(request.form["cedula"])))
	for i in cursor.fetchall():
		ideUser=i[0]
	print(type(ideUser))
	cursor.execute('INSERT INTO ESTUDIANTE (idGrupo, nombre, cedula, estado, idUser) VALUES (%s, %s, %s, %s, %s)', (ide, request.form["nombre"], request.form["cedula"], request.form["Estado"],str(ideUser)))
	cursor.connection.commit()
	return redirect(url_for("materias"))

@app.route("/Borrar/Estudiante", methods=["POST"])
def BorrarEstudiante():
	if not g.user:
		return redirect(url_for("login"))
	ide=request.form["idE"]
	db.ping()
	cursor = db.cursor()
	cursor.execute("SELECT * FROM ESTUDIANTE WHERE id=%s",(ide))
	for i in cursor.fetchall():
		ideG=i[2]
	cursor.execute('DELETE FROM ESTUDIANTE WHERE id=%s', (ide))
	cursor.connection.commit()
	return redirect(url_for("Estudiantes", ide=ideG))

@app.route("/Editar/Estudiante", methods=["POST"])
def EditarEstudiante():
	ide=request.form["idE"]
	db.ping()
	cursor = db.cursor()
	cursor.execute("SELECT * FROM ESTUDIANTE WHERE id=%s",(ide))
	a=cursor.fetchall()[0]
	cursor.connection.commit()

	return render_template("editarA.html",estudiante=a,ide=session["userid"])

@app.route("/Actualizar/Estudiante", methods=["POST"])
def ActualizarEstudiante():
	if not g.user:
		return redirect(url_for("login"))
	db.ping()
	cursor = db.cursor()
	cursor.execute("UPDATE ESTUDIANTE SET NOMBRE=%s, CEDULA=%s, ESTADO=%s WHERE id=%s",(request.form["nombre"],request.form["cedula"],request.form["estado"],request.form["idE"]))
	cursor.connection.commit()
	return redirect(url_for("Estudiantes", ide=request.form["idG"]))

@app.route("/Perfil", methods=["POST"])
def verPerfil():
	if not g.user:
		return redirect(url_for("login"))

	ide=request.form["idE"]
	db.ping()
	cursor = db.cursor()
	cursor.execute("SELECT * FROM USUARIOS WHERE id=%s",(ide))
	a=cursor.fetchall()
	cursor.connection.commit()
	print(a)
	for x2 in a:
		i=list(a[0])
		if i[5]=="":
			if i[6]=="p":
				i[5]="p"
			else:
				i[5]="e"
		a=i


	return render_template("perfil.html",usuario=a,ide=session["userid"])
db.ping()
cursor = db.cursor()
cursor.execute("SELECT * FROM USUARIOS")
users=cursor.fetchall()
cursor.connection.commit()
@app.route("/login" ,methods=["POST", "GET"])
def login():
	if request.method=="POST":
		db.ping()
		cursor = db.cursor()
		cursor.execute("SELECT * FROM USUARIOS")
		users=cursor.fetchall()
		cursor.connection.commit()
		#return request.form
		session.pop("userid",None)
		name=request.form['name']
		password=request.form['password']
		contador=0
		user=[x for x in users if x[1]==name]
		
		for i in user:
			contador+=1
		
		if contador==0:
			return render_template("login.html", mensaje="El Nombre O La Contraseña No Son Correctos Intentelo De Nuevo.")
		else:
			contador=0
			user=user[0]

		if user[7]==password:
			session["userid"]=user[0]
			contador=0
			return redirect(url_for("index"))
		else:
			return render_template("login.html", mensaje="El Nombre O La Contraseña No Son Correctos Intentelo De Nuevo.")

	session.pop("userid",None)
	g.user=None
	return render_template("login.html", mensaje="")

@app.route("/Registrarse" ,methods=["POST", "GET"])
def Registrarse():

	if request.method=="POST":
		cedula=request.form["cedula"]
		role=request.form["role"]

		db.ping()
		cursor = db.cursor()
		cursor.execute("SELECT * FROM ESTUDIANTE WHERE CEDULA=%s",(cedula))
		contador=0
		for i in cursor.fetchall():
			contador+=1

		if role=="Profesor":
			contador=1
			role="p"
		else:
			role="e"
	
		if contador!=0:

			nombre=request.form["nombre"]
			
			contraseña=request.form["contraseña"]
			email=request.form["email"]
			telefono=request.form["telefono"]
			
			cursor.execute("INSERT INTO USUARIOS(NOMBRE,CEDULA,EMAIL,TELEFONO,ROLE,CONTRASEÑA) VALUES (%s,%s,%s,%s,%s,%s)",(nombre,cedula,email,telefono,role,contraseña))
			
			cursor.execute("SELECT * FROM USUARIOS WHERE CEDULA=%s",(cedula))
			for i in cursor.fetchall():
				cursor.execute("UPDATE ESTUDIANTE SET idUSER=%s WHERE CEDULA=%s",(i[0],cedula))
	
			
		else:
			session.pop("userid",None)
			g.user=None
			return render_template("registrarse.html",mensaje="Ningun Profesor Lo Ha Registrado En Una Materia.")
			#return "No Estas Registrado"
		cursor.connection.commit()
		return "Listo"

	session.pop("userid",None)
	g.user=None
	return render_template("registrarse.html",mensaje="")


@app.route("/ide")
def ide():
	return jsonify(session["userid"])

#Escuchar Evento
@socketio.on("message")
def handleMessage(msg,grupo):
	
	print("Message: "+msg)
	print(session["userid"],"Seccionnnnnnnnn\n\n")
	print(grupo,"grupo\n\n")
	cursor = db.cursor()
	cursor.execute('INSERT INTO MENSAJE (idUser, grupo, mensaje) VALUES (%s, %s, %s)', (session["userid"],grupo,msg))
	cursor.execute('SELECT * FROM MENSAJE WHERE grupo=%s',(grupo))
	a=cursor.fetchall()

	cursor.connection.commit()
	print(a)
	arrays=[msg,session["userid"]]
	send(arrays, broadcast=True)



if __name__=="__main__":
	socketio.run(app, port=3000, debug=True)

#https://www.youtube.com/watch?v=uT9ozz-YAIA