-- Insertar socios de ejemplo para el gimnasio

-- Socios para Sucursal 1 (Matriz)
INSERT INTO Socios (Nombre, ApellidoPaterno, ApellidoMaterno, Email, Telefono, FechaNacimiento, Direccion, Activo, SucursalId, Slug)
VALUES 
('Juan', 'García', 'López', 'juan.garcia@email.com', '5551234567', '1990-05-15', 'Av. Reforma 123, Col. Centro', 1, 1, 'juan-garcia-lopez'),
('María', 'Rodríguez', 'Hernández', 'maria.rodriguez@email.com', '5551234568', '1988-08-22', 'Calle Juárez 456, Col. Norte', 1, 1, 'maria-rodriguez-hernandez'),
('Carlos', 'Martínez', 'Sánchez', 'carlos.martinez@email.com', '5551234569', '1995-03-10', 'Av. Hidalgo 789, Col. Sur', 1, 1, 'carlos-martinez-sanchez'),
('Ana', 'López', 'Ramírez', 'ana.lopez@email.com', '5551234570', '1992-11-30', 'Calle Morelos 321, Col. Este', 1, 1, 'ana-lopez-ramirez');

-- Socios para Sucursal 2 (Norte)
INSERT INTO Socios (Nombre, ApellidoPaterno, ApellidoMaterno, Email, Telefono, FechaNacimiento, Direccion, Activo, SucursalId, Slug)
VALUES 
('Pedro', 'Fernández', 'Torres', 'pedro.fernandez@email.com', '5551234571', '1987-07-18', 'Av. Universidad 555, Col. Norte', 1, 2, 'pedro-fernandez-torres'),
('Laura', 'González', 'Díaz', 'laura.gonzalez@email.com', '5551234572', '1993-02-25', 'Calle Insurgentes 666, Col. Norte', 1, 2, 'laura-gonzalez-diaz'),
('Roberto', 'Sánchez', 'Vargas', 'roberto.sanchez@email.com', '5551234573', '1991-09-14', 'Av. Constitución 777, Col. Norte', 1, 2, 'roberto-sanchez-vargas');

-- Socios para Sucursal 3 (Sur)
INSERT INTO Socios (Nombre, ApellidoPaterno, ApellidoMaterno, Email, Telefono, FechaNacimiento, Direccion, Activo, SucursalId, Slug)
VALUES 
('Isabel', 'Ramírez', 'Cruz', 'isabel.ramirez@email.com', '5551234574', '1989-12-05', 'Calle Independencia 888, Col. Sur', 1, 3, 'isabel-ramirez-cruz'),
('Miguel', 'Torres', 'Flores', 'miguel.torres@email.com', '5551234575', '1994-04-20', 'Av. Revolución 999, Col. Sur', 1, 3, 'miguel-torres-flores'),
('Patricia', 'Vargas', 'Morales', 'patricia.vargas@email.com', '5551234576', '1986-06-08', 'Calle Libertad 111, Col. Sur', 1, 3, 'patricia-vargas-morales');

-- Asignar membresías a algunos socios (SocioMembresias)
-- Juan García - Membresía Mensual
INSERT INTO SocioMembresias (SocioId, MembresiaId, FechaInicio, FechaFin, Activo, FechaCreacion)
VALUES (1, 1, '2025-10-01', '2025-10-31', 1, GETDATE());

-- María Rodríguez - Membresía Trimestral
INSERT INTO SocioMembresias (SocioId, MembresiaId, FechaInicio, FechaFin, Activo, FechaCreacion)
VALUES (2, 2, '2025-10-01', '2025-12-30', 1, GETDATE());

-- Carlos Martínez - Membresía Anual
INSERT INTO SocioMembresias (SocioId, MembresiaId, FechaInicio, FechaFin, Activo, FechaCreacion)
VALUES (3, 4, '2025-10-01', '2026-09-30', 1, GETDATE());

-- Pedro Fernández - Membresía Semestral
INSERT INTO SocioMembresias (SocioId, MembresiaId, FechaInicio, FechaFin, Activo, FechaCreacion)
VALUES (5, 3, '2025-10-01', '2026-03-31', 1, GETDATE());

-- Laura González - Membresía Mensual
INSERT INTO SocioMembresias (SocioId, MembresiaId, FechaInicio, FechaFin, Activo, FechaCreacion)
VALUES (6, 1, '2025-10-01', '2025-10-31', 1, GETDATE());

-- Miguel Torres - Membresía Trimestral
INSERT INTO SocioMembresias (SocioId, MembresiaId, FechaInicio, FechaFin, Activo, FechaCreacion)
VALUES (9, 2, '2025-10-01', '2025-12-30', 1, GETDATE());

-- Insertar algunos pagos de ejemplo
-- Pago de Juan García
INSERT INTO Pagos (Monto, Fecha, MetodoPago, Estado, Referencia, SocioId, SocioMembresiaId, SucursalId, UsuarioRegistroId, FechaCreacion)
VALUES (500.00, '2025-10-01', 'Efectivo', 'Confirmado', 'PAG-001', 1, 1, 1, 1, GETDATE());

-- Pago de María Rodríguez
INSERT INTO Pagos (Monto, Fecha, MetodoPago, Estado, Referencia, SocioId, SocioMembresiaId, SucursalId, UsuarioRegistroId, FechaCreacion)
VALUES (1350.00, '2025-10-01', 'Tarjeta', 'Confirmado', 'PAG-002', 2, 2, 1, 1, GETDATE());

-- Pago de Carlos Martínez
INSERT INTO Pagos (Monto, Fecha, MetodoPago, Estado, Referencia, SocioId, SocioMembresiaId, SucursalId, UsuarioRegistroId, FechaCreacion)
VALUES (4500.00, '2025-10-01', 'Transferencia', 'Confirmado', 'PAG-003', 3, 3, 1, 1, GETDATE());

-- Registrar algunas asistencias
-- Juan García - Entrada hoy
INSERT INTO Asistencias (FechaHoraEntrada, SocioId, SucursalId, FechaCreacion)
VALUES (GETDATE(), 1, 1, GETDATE());

-- María Rodríguez - Entrada y salida ayer
INSERT INTO Asistencias (FechaHoraEntrada, FechaHoraSalida, SocioId, SucursalId, FechaCreacion)
VALUES (DATEADD(day, -1, GETDATE()), DATEADD(hour, 2, DATEADD(day, -1, GETDATE())), 2, 1, GETDATE());

-- Pedro Fernández - Entrada hoy
INSERT INTO Asistencias (FechaHoraEntrada, SocioId, SucursalId, FechaCreacion)
VALUES (GETDATE(), 5, 2, GETDATE());

SELECT 'Socios, membresías, pagos y asistencias insertados correctamente' AS Resultado;
