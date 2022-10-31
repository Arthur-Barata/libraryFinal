import React from "react";
import "./Header.css";

function Header(){
    const showConsult= ()=>{
       
        let research= document.getElementsByClassName("research")[0]
        let inputContainer= document.getElementsByClassName("input-container")[0]    
        inputContainer.style.display="none"
        research.style.display="flex"
        
       

    }
    const showCad=()=>{
         let research= document.getElementsByClassName("research")[0]
        let inputContainer= document.getElementsByClassName("input-container")[0]
        let book= document.getElementsByClassName("book")[0]
        book.style.display="none"
        inputContainer.style.display="flex"
        research.style.display="none"
    }
    const showMenu=()=>{
        let span= document.getElementsByTagName("span")[1]
        span.classList.add("activebtn")
        let span2= document.getElementsByTagName("span")[0]
        span2.classList.remove("activebtn")
        let ul = document.getElementsByClassName("ulMenu")[0]
        ul.classList.add("activeul")

    }
    const closeMenu=()=>{
        let span= document.getElementsByTagName("span")[1]
        span.classList.remove("activebtn")
        let span2= document.getElementsByTagName("span")[0]
        span2.classList.add("activebtn")
        let ul = document.getElementsByClassName("ulMenu")[0]
        ul.classList.remove("activeul")
       
    }

  return(
        <div className="Header">
            <div className="imgh1">
                <img className="img1" alt="imagem de livros" src="./assets/books.png"></img>
                <h2>Library Management</h2>
            </div>
                <div className="divMenu">
                    <span className="bot menu activebtn" onClick={showMenu}><img alt="menu" src="../assets/menu.png"></img></span>
                    <span className="bot close" onClick={closeMenu}><img alt="menu" src="../assets/close.png"></img></span>
            </div>
                <ul id="ulMenu" className="ulMenu">
                    <li id="li1"onClick={()=>{
                        let  h4research= document.getElementsByClassName("h4research")[0] 
                        let  h4researchn= document.getElementsByClassName("h4research")[1] 
                        h4research.style.display="none" 
                        h4researchn.style.display="none" 
                        showConsult()}}>
                        Consultar
                    </li>
                    <li id="li2" onClick={showCad}>Cadastrar</li>

                    <li id="li3" onClick={()=>{
                        let  h4research= document.getElementsByClassName("h4research")[0] 
                        let  h4researchn= document.getElementsByClassName("h4research")[1] 
                        h4research.style.display="block" 
                        h4researchn.style.display="none"                     
                        showConsult()}}>
                        Alterar
                    </li>

                    <li id="li4"  onClick={()=>{
                        let  h4research= document.getElementsByClassName("h4research")[1]
                        let  h4researchn= document.getElementsByClassName("h4research")[0]  
                        h4research.style.display="block" 
                        h4researchn.style.display="none"
                        showConsult()}}>
                        Excluir
                    </li>
                </ul>
        </div>
    )
}

export default Header;