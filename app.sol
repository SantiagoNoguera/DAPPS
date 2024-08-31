// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AlmacenarTextos {

    string private textoAlmacenado;
    address public propietario;

    constructor () {
        propietario = msg.sender;
    }

    function almacenerTexto(string memory nuevoTexto) public {
        textoAlmacenado = nuevoTexto;
    }

    function consultarTexto() public view returns (string memory) {
        return  textoAlmacenado;
    }

}