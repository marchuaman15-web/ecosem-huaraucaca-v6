// ECOSEM - Sistema de Autenticación con 52 Usuarios
// Credenciales actualizadas según lista oficial

const USUARIOS_ECOSEM = {
  // ADMINISTRADORES
  'admin': { password: 'ecosem2025', rol: 'admin', nombre: 'Administrador 1' },
  'admin2': { password: 'ecosem2025', rol: 'admin', nombre: 'Administrador 2' },
  
  // SUPERVISORES
  'supervisor': { password: 'sup2025', rol: 'supervisor', nombre: 'Supervisor Mantenimiento' },
  'supervisor2': { password: 'sup2025', rol: 'supervisor', nombre: 'Supervisor 2' },
  
  // GERENCIA
  'gerencia': { password: 'ger2025', rol: 'gerencia', nombre: 'Gerencia' },
  
  // SUPERVISORES DE ÁREA
  'area1': { password: 'area2025', rol: 'supervisor_area', nombre: 'Supervisor Área 1' },
  'area2': { password: 'area2025', rol: 'supervisor_area', nombre: 'Supervisor Área 2' },
  
  // MECÁNICOS (44 en total)
  'aldair': { password: 'mec2025', rol: 'mecanico', nombre: 'ALDAIR YADMIR FLORES LEYVA' },
  'alex': { password: 'mec2025', rol: 'mecanico', nombre: 'ALEX SANTIAGO BONILLA' },
  'alfonso': { password: 'mec2025', rol: 'mecanico', nombre: 'ALFONSO UGARTE JAVIER' },
  'alvarado': { password: 'mec2025', rol: 'mecanico', nombre: 'ALVARADO SOTO WILLIAM' },
  'brandon': { password: 'mec2025', rol: 'mecanico', nombre: 'BRANDON ARCE CASIMIRO' },
  'brayan': { password: 'mec2025', rol: 'mecanico', nombre: 'BRAYAN MARLON CAJACURI ROJAS' },
  'callupe': { password: 'mec2025', rol: 'mecanico', nombre: 'CALLUPE MATIAS JOSMEL' },
  'campos': { password: 'mec2025', rol: 'mecanico', nombre: 'CAMPOS ALVARADO JHONATAN FELIX' },
  'caqui': { password: 'mec2025', rol: 'mecanico', nombre: 'CAQUI TORRES FRAN' },
  'carhuachin': { password: 'mec2025', rol: 'mecanico', nombre: 'CARHUACHIN CAJACHAGUA FERLANS MANUEL' },
  'celis': { password: 'mec2025', rol: 'mecanico', nombre: 'CELIS SECADA KEVIN' },
  'colca': { password: 'mec2025', rol: 'mecanico', nombre: 'COLCA COLLAZOS JHON' },
  'daniel': { password: 'mec2025', rol: 'mecanico', nombre: 'DANIEL PUENTE SACRAMENTO' },
  'david': { password: 'mec2025', rol: 'mecanico', nombre: 'DAVID BAUTISTA RIOS' },
  'estrada': { password: 'mec2025', rol: 'mecanico', nombre: 'ESTRADA MINAYA NILTON' },
  'flores': { password: 'mec2025', rol: 'mecanico', nombre: 'FLORES MAYTA LUIS RAUL' },
  'huacho': { password: 'mec2025', rol: 'mecanico', nombre: 'HUACHO TRINIDAD ISAAC LEONARDO' },
  'huaman': { password: 'mec2025', rol: 'mecanico', nombre: 'HUAMAN CARLOS PABLO' },
  'huaman2': { password: 'mec2025', rol: 'mecanico', nombre: 'HUAMAN POMA MARCO ANTONIO' },
  'hugo': { password: 'mec2025', rol: 'mecanico', nombre: 'HUGO ELEAZAR VIVAS POMA' },
  'jhasler': { password: 'mec2025', rol: 'mecanico', nombre: 'JHASLER KLISMAN PANEZ MAURICIO' },
  'jhon': { password: 'mec2025', rol: 'mecanico', nombre: 'JHON RIVAS BERAUN' },
  'jhonathan': { password: 'mec2025', rol: 'mecanico', nombre: 'JHONATHAN MAURICIO ROJAS' },
  'jhordy': { password: 'mec2025', rol: 'mecanico', nombre: 'JHORDY ZELAYA RICAPA' },
  'jhunior': { password: 'mec2025', rol: 'mecanico', nombre: 'JHUNIOR CAPCHA' },
  'julinho': { password: 'mec2025', rol: 'mecanico', nombre: 'JULINHO ALEJANDRO JAVIER AYALA' },
  'kevin': { password: 'mec2025', rol: 'mecanico', nombre: 'KEVIN POMA HUAYNATE' },
  'leomar': { password: 'mec2025', rol: 'mecanico', nombre: 'LEOMAR ALY BALDEON CARHUARICRA' },
  'luis': { password: 'mec2025', rol: 'mecanico', nombre: 'LUIS FALCON QUINTANA' },
  'mauricio': { password: 'mec2025', rol: 'mecanico', nombre: 'MAURICIO CUENCA ANDERSON' },
  'mauricio2': { password: 'mec2025', rol: 'mecanico', nombre: 'MAURICIO POMA PITER' },
  'medina': { password: 'mec2025', rol: 'mecanico', nombre: 'MEDINA ESPINOZA KEVIN' },
  'meza': { password: 'mec2025', rol: 'mecanico', nombre: 'MEZA CELIS DEAN ROYER' },
  'minaya': { password: 'mec2025', rol: 'mecanico', nombre: 'MINAYA VERTIZ WALDIR FRANDHINO' },
  'munoz': { password: 'mec2025', rol: 'mecanico', nombre: 'MUNOZ SERNA FREDY' },
  'palacin': { password: 'mec2025', rol: 'mecanico', nombre: 'PALACIN DELGADO ROONY' },
  'percy': { password: 'mec2025', rol: 'mecanico', nombre: 'PERCY MAURICIO ROJAS' },
  'rafaelo': { password: 'mec2025', rol: 'mecanico', nombre: 'RAFAELO VILLAVICENCIO FRANK JOSEPH' },
  'rogelio': { password: 'mec2025', rol: 'mecanico', nombre: 'ROGELIO ALVARADO MALPARTIDA' },
  'waldemaro': { password: 'mec2025', rol: 'mecanico', nombre: 'WALDEMARO SANTIAGO CHAVEZ' },
  'wilber': { password: 'mec2025', rol: 'mecanico', nombre: 'WILBER ALVARADO MALPARTIDA' },
  // ── NUEVO USUARIO AGREGADO ──
  'wilber2': { password: 'mec2025', rol: 'mecanico', nombre: 'WILBER HUGO ALBARADO MALPARTIDA' },
  'williams': { password: 'mec2025', rol: 'mecanico', nombre: 'WILLIAMS POMA ALVARADO' },
  'yachachin': { password: 'mec2025', rol: 'mecanico', nombre: 'YACHACHIN HUAMALI DAVID' },
  'zevallos': { password: 'mec2025', rol: 'mecanico', nombre: 'ZEVALLOS FLORES LEO' }
};

// Función de login mejorada
function loginECOSEM(usuario, password) {
  const user = USUARIOS_ECOSEM[usuario.toLowerCase().trim()];
  
  if (!user) {
    return { success: false, message: 'Usuario no encontrado' };
  }
  
  if (user.password !== password) {
    return { success: false, message: 'Contraseña incorrecta' };
  }
  
  // Login exitoso
  return {
    success: true,
    usuario: usuario,
    rol: user.rol,
    nombre: user.nombre
  };
}

// Permisos por rol
const PERMISOS_ROL = {
  admin: {
    crearOT: true,
    editarOT: true,
    eliminarOT: true,
    verTodas: true,
    exportar: true,
    imprimir: true, // SOLO ADMIN
    gestionarMecanicos: true,
    gestionarInventario: true,
    verKPIs: true,
    firmarOT: true
  },
  supervisor: {
    crearOT: true,
    editarOT: true,
    eliminarOT: false,
    verTodas: true,
    exportar: true,
    imprimir: false,
    gestionarMecanicos: true,
    gestionarInventario: true,
    verKPIs: true,
    firmarOT: true
  },
  gerencia: {
    crearOT: false,
    editarOT: false,
    eliminarOT: false,
    verTodas: true,
    exportar: true,
    imprimir: false,
    gestionarMecanicos: false,
    gestionarInventario: false,
    verKPIs: true,
    firmarOT: false
  },
  supervisor_area: {
    crearOT: true,
    editarOT: false,
    eliminarOT: false,
    verTodas: false,
    exportar: false,
    imprimir: false,
    gestionarMecanicos: false,
    gestionarInventario: false,
    verKPIs: false,
    firmarOT: false,
    notificarMecanicos: true
  },
  mecanico: {
    crearOT: true,
    editarOT: false,
    eliminarOT: false,
    verTodas: false,
    exportar: false,
    imprimir: false,
    gestionarMecanicos: false,
    gestionarInventario: false,
    verKPIs: false,
    firmarOT: true
  }
};

// Verificar permiso
function tienePermisoECOSEM(permiso) {
  const rol = S.rol || 'mecanico';
  return PERMISOS_ROL[rol]?.[permiso] || false;
}

// Aplicar sistema de login al formulario existente
function iniciarSesionECOSEM() {
  const usuario = document.getElementById('login-user')?.value || '';
  const password = document.getElementById('login-pass')?.value || '';
  
  const resultado = loginECOSEM(usuario, password);
  
  if (resultado.success) {
    S.uid = 'user_' + Date.now();
    S.rol = resultado.rol;
    S.nombre = resultado.nombre;
    S.usuario = resultado.usuario;
    
    localStorage.setItem('ecosem_session', JSON.stringify(S));
    
    document.getElementById('login-screen')?.classList.add('hidden');
    document.getElementById('app-main')?.classList.remove('hidden');
    
    toast(`✅ Bienvenido, ${S.nombre}`, '#30D158');
    
    if (typeof cargarDatosIniciales === 'function') {
      cargarDatosIniciales();
    }
  } else {
    toast(`❌ ${resultado.message}`, '#FF3B30');
  }
}

// Restaurar sesión al cargar
function restaurarSesionECOSEM() {
  const session = localStorage.getItem('ecosem_session');
  if (session) {
    try {
      const data = JSON.parse(session);
      S.uid = data.uid;
      S.rol = data.rol;
      S.nombre = data.nombre;
      S.usuario = data.usuario;
      
      document.getElementById('login-screen')?.classList.add('hidden');
      document.getElementById('app-main')?.classList.remove('hidden');
      
      return true;
    } catch(e) {
      console.error('Error restaurando sesión:', e);
    }
  }
  return false;
}

// Cerrar sesión
function cerrarSesionECOSEM() {
  localStorage.removeItem('ecosem_session');
  S = { uid: null, rol: null, nombre: null, usuario: null };
  
  document.getElementById('login-screen')?.classList.remove('hidden');
  document.getElementById('app-main')?.classList.add('hidden');
  
  toast('👋 Sesión cerrada', '#6B7A99');
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
  if (!restaurarSesionECOSEM()) {
    document.getElementById('login-screen')?.classList.remove('hidden');
    document.getElementById('app-main')?.classList.add('hidden');
  }
});

console.log('✅ Sistema de autenticación ECOSEM cargado (52 usuarios)');
