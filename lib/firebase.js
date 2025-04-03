import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs,
  onSnapshot,
  addDoc
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAoAJlaEMBZnTeAQGRuZATJa7Cma8MxU1g",
  authDomain: "marketplace-71ee0.firebaseapp.com",
  projectId: "marketplace-71ee0",
  storageBucket: "marketplace-71ee0.appspot.com",
  messagingSenderId: "746397293920",
  appId: "1:746397293920:web:70efae1d82d374972e5205",
  measurementId: "G-MPDGBB12ZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Función para obtener el precio de un producto específico
export async function getProductPrice(productId) {
  try {
    const docRef = doc(db, "Productos", productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().precio;
    } else {
      console.log("No existe el producto!");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el precio:", error);
    return null;
  }
}

// Función para actualizar el precio de un producto
export async function updateProductPrice(productId, newPrice) {
  try {
    const docRef = doc(db, "Productos", productId);
    await setDoc(docRef, { precio: Number(newPrice) }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error al actualizar el precio:", error);
    return false;
  }
}

// Función para obtener todos los precios
export async function getAllPrices() {
  try {
    const querySnapshot = await getDocs(collection(db, "Productos"));
    const prices = {};
    querySnapshot.forEach((doc) => {
      prices[doc.id] = doc.data().precio;
    });
    return prices;
  } catch (error) {
    console.error("Error al obtener los precios:", error);
    return {};
  }
}

// Función para suscribirse a cambios en todos los precios
export function subscribeToAllPrices(callback) {
  const unsubscribe = onSnapshot(collection(db, "Productos"), (snapshot) => {
    const prices = {};
    snapshot.forEach((doc) => {
      prices[doc.id] = doc.data().precio;
    });
    callback(prices);
  }, (error) => {
    console.error("Error al suscribirse a los precios:", error);
  });

  return unsubscribe;
}

// Función para suscribirse a cambios en el precio de un producto específico
export function subscribeToPrice(productId, callback) {
  const unsubscribe = onSnapshot(doc(db, "Productos", productId), (doc) => {
    if (doc.exists()) {
      callback(doc.data().precio);
    } else {
      callback(null);
    }
  }, (error) => {
    console.error("Error al suscribirse al precio:", error);
    callback(null);
  });

  return unsubscribe;
}

// Función para registrar un click en el botón de WhatsApp
export async function registrarClickWhatsApp(productoId, nombreProducto) {
  try {
    const clickRef = collection(db, "clicks_whatsapp");
    await addDoc(clickRef, {
      producto_id: productoId,
      nombre_producto: nombreProducto,
      fecha: new Date(),
    });
    return true;
  } catch (error) {
    console.error("Error al registrar click:", error);
    return false;
  }
}

// Función para obtener el total de clicks
export async function obtenerTotalClicks() {
  try {
    const clicksRef = collection(db, "clicks_whatsapp");
    const snapshot = await getDocs(clicksRef);
    return snapshot.size;
  } catch (error) {
    console.error("Error al obtener total de clicks:", error);
    return 0;
  }
}

// Función para obtener clicks por producto
export async function obtenerClicksPorProducto() {
  try {
    const clicksRef = collection(db, "clicks_whatsapp");
    const snapshot = await getDocs(clicksRef);
    const clicks = {};
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      const nombreProducto = data.nombre_producto;
      clicks[nombreProducto] = (clicks[nombreProducto] || 0) + 1;
    });
    
    return clicks;
  } catch (error) {
    console.error("Error al obtener clicks por producto:", error);
    return {};
  }
}

// Función para incrementar el contador de clicks de WhatsApp
export async function incrementarClicksWhatsApp() {
  try {
    const contadorRef = doc(db, "contadores", "whatsapp");
    
    // Intentar obtener el documento actual
    const docSnap = await getDoc(contadorRef);
    
    if (docSnap.exists()) {
      // Si existe, incrementar el contador
      await setDoc(contadorRef, {
        total: (docSnap.data().total || 0) + 1,
        ultima_actualizacion: new Date()
      }, { merge: true });
    } else {
      // Si no existe, crear el documento con contador inicial
      await setDoc(contadorRef, {
        total: 1,
        ultima_actualizacion: new Date()
      });
    }
  } catch (error) {
    console.error("Error al incrementar contador:", error);
  }
}

// Función para obtener el total de clicks
export async function obtenerTotalClicksWhatsApp() {
  try {
    const contadorRef = doc(db, "contadores", "whatsapp");
    const docSnap = await getDoc(contadorRef);
    
    if (docSnap.exists()) {
      return docSnap.data().total || 0;
    }
    return 0;
  } catch (error) {
    console.error("Error al obtener total de clicks:", error);
    return 0;
  }
}

export { db };