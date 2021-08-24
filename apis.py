from flask import Blueprint, jsonify, request
from flaskext.mysql import MySQL
import pymysql
api = Blueprint('account_api', __name__)

db=pymysql.connect(host='localhost',user='root', password='',db='CHAT')

api.secret_key='somesecretkeythantonlyishouldknow'

@api.route("/api/index/<int:ide>")
def apies(ide):
	db.ping()
	cursor = db.cursor()
	cursor.execute('SELECT * FROM MENSAJE WHERE grupo=%s',(ide))
	a=cursor.fetchall()
	c=[]
	for i in a:
		i=list(i)
		ideU=i[1]
		cursor.execute('SELECT * FROM USUARIOS WHERE id=%s',(ideU))
		for b in cursor.fetchall():
			i.insert(4,b[1])
			i.insert(5,b[6])
		c.append(i)
	cursor.connection.commit()
	
	return jsonify(c)

	

