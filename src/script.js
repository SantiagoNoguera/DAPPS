const contratoABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "nuevoTexto",
                "type": "string"
            }
        ],
        "name": "almacenerTexto",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "consultarTexto",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "propietario",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

//Dirección del contrato desplegado.
const contratoAddres = "0x933dA5a5fcce1b37412A666FDd7d12B182316B24";
//Variable para almacenar la instancia del contrato.
let contrato;

async function conectar() {
    //Solicitar acceso a la cuenta de Metamask.
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    //Crea un proveedor Web3.
    const proveedor = new ethers.providers.Web3Provider(window.ethereum);
    //Dirección de quien firma el contrato.
    const firmante = proveedor.getSigner();
    //Crea la instancia del contrato.
    contrato = new ethers.Contract(contratoAddres, contratoABI, firmante);

    document.getElementById("accountSpan").textContent = await firmante.getAddress();
    document.getElementById("conectarBtn").textContent = "Conectado";
}

async function almacenar() {
    try {
        //Obtener el texto a almacenar.
        const tx = await contrato.almacenerTexto(document.getElementById("textoInput").value);
        document.getElementById('confirmacion').textContent = 'Almacenando...';
        //Esperar la confirmación de la transacción.
        const receipt = await tx.wait();
        document.getElementById('confirmacion').textContent = 'Texto almacenado';
        document.getElementById('hashTransaccion').textContent = receipt.transactionHash;
    }
    catch (error) {
        document.getElementById('confirmacion').textContent = 'Error al almacenar';
    }
}

async function consultar() {
    try {
        const texto = await contrato.consultarTexto();
        //Muestra el contenido almacenado.
        document.getElementById("textoAlmacenado").textContent = "Texto: " + texto;
    }
    catch (error) {
        document.getElementById("accountSpan").textContent = "Error al consultar";
    }
}

document.getElementById("conectarBtn").onclick = conectar;
document.getElementById("almacenarBtn").onclick = almacenar;
document.getElementById("consultarBtn").onclick = consultar;
