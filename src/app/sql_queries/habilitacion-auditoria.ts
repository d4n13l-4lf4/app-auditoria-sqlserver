export const creacion_auditoria = `
USE master;
CREATE SERVER AUDIT Auditoria_BD TO FILE ( FILEPATH = 'C:\\Daniel\\Auditoría' )`;

export const habilitacion_auditoria = `
USE master; 
ALTER SERVER AUDIT Auditoria_BD  WITH (STATE = ON)`;

export const espec_audit_bd = `
USE Orders;
CREATE DATABASE AUDIT SPECIFICATION Audit_Data_Modification FOR SERVER AUDIT Auditoria_BD 
ADD ( SELECT, INSERT, UPDATE, DELETE ON Schema::dbo BY public), ADD ( SCHEMA_OBJECT_CHANGE_GROUP) 
WITH (STATE = ON)`;


