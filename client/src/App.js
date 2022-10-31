import React,{useState} from 'react';
import Axios from "axios";
import "./App.css";
import Header from './Header';

function App() {

  const[ISBN,setISBN]=useState(null)
  const[title,settitle]=useState(null)
  const[author,setauthor]=useState(null)
  const[pages,setpages]=useState(null)
  const[copies,setcopies]=useState(null)
  const[ISBNc,setISBNc]=useState("")
  const[bookData,setbookData]=useState("")

  const[newISBN,setNewISBN]=useState('')
  const[newTitle,setNewTitle]=useState('')
  const[newAuthor,setNewAuthor]=useState('')
  const[newPages,setNewPages]=useState(0)
  const[newCopies,setNewCopies]=useState(0)
  
  const[cadAlert,setCadAlert]=useState("")
  
  
  

  const cadBook=()=>{

   

    Axios.post("http://localhost:3001/cadastro",
    {ISBN:ISBN,
      title:title,
      author:author,
      pages:pages,
      copies:copies
    }).then((response)=>{

        setISBN(null)
        settitle("")
        setauthor(null)
        setpages(null)
        setcopies(null)
     
      console.log(response.data)
      setCadAlert(response.data)
      setTimeout(()=>{setCadAlert("")},3000)

      let inp = document.getElementsByClassName("inp")
    
      for(let i=0;i<inp.length;i++){
        inp[i].value=""
      }
    })
  }

  const showBook= ()=>{
    let book= document.getElementsByClassName("book")[0]
    book.style.display="flex"
    Axios.get("http://localhost:3001/consulta",{params:{ISBNc:ISBNc}}).then((response)=>{

          if(response.data.length===0){
            setbookData({title:"Não foram encontrados livros com esse código"})
            console.log(bookData)
            console.log("erro")

          }
          else{
            
            
            setbookData(response.data[0])  
            setNewAuthor(response.data[0].author)
            setNewTitle(response.data[0].title)
            setNewISBN(response.data[0].ISBN)
            setNewCopies(response.data[0].copies)
            setNewPages(response.data[0].pages)
            
           
          }
      

    })
  }

  const editBook =()=>{
    
    Axios.put("http://localhost:3001/editar",
    {newISBN:newISBN,
    newTitle:newTitle,
    newAuthor:newAuthor,
    newPages:newPages,
    newCopies:newCopies
    }).then((response)=>{
      setbookData({ISBN:newISBN,
        title:newTitle,
        author:newAuthor,
        pages:newPages,
        copies:newCopies})
        window.alert("livro Editado com sucesso")
      
     
      
    })
  }
  const editInput=( )=>{
    let input1=document.getElementsByClassName("inputColap")[0]
    let input2=document.getElementsByClassName("inputColap")[1]
    let input3=document.getElementsByClassName("inputColap")[2]
    let input4=document.getElementsByClassName("inputColap")[3]
    
    
    input1.classList.toggle("active")
    input2.classList.toggle("active")
    input3.classList.toggle("active")
    input4.classList.toggle("active")
    
    
    
    

  }
  const deleteBook =(ISBN)=>{

    Axios.delete(`http://localhost:3001/deletar/${ISBN}`)
    .then((response)=>{
      window.alert("livro excluído com sucesso")
      
    })

  }


  return (
    <div className="App-container">

      <Header></Header>

      <div className="input-container">
        <h3>Digite os dados do livro a ser cadastrado</h3>
        <h5>{cadAlert}</h5>
        <input
          className='inp'
          type="number" 
          name="ISBN" 
          placeholder="ISBN" 
          onChange={(event)=>{
            setISBN(event.target.value)
          }}>

        </input>

        <input 
          className='inp'
          type="text" 
          name="title" 
          placeholder="Title" 
          onChange={(event)=>{
            settitle(event.target.value)
            console.log(event.target.value)
           
          }}>

        </input>

        <input 
        className='inp'
          type="text" 
          name="Author" 
          placeholder="Author"
          onChange={(event)=>{
            setauthor(event.target.value)
          }}></input>

        <input 
        className='inp'
          type="number" 
          name="pages" 
          placeholder="Number of pages" onChange={(event)=>{
            setpages(event.target.value)
          }}></input>

        <input 
          className='inp'
          type="number" 
          name="copies" 
          placeholder="Number of copies" onChange={(event)=>{
            setcopies(event.target.value)
          }}>

        </input>

          <button onClick={cadBook}> Cadastrar</button>
          
      </div>
      <div className="research">
        <h4 className="h4research">Digite o ISBN do livro que deseja alterar</h4>
        <h4 className="h4research">Digite o ISBN do livro que deseja excluir</h4>
        <input
         type="number" 
         name="ISBN-research" 
         placeholder="Digite o ISBN" 
         onChange={(event)=>{setISBNc(event.target.value)}}>
        </input>
        <button onClick={showBook}> Consultar</button>

        
      </div>
      <div className="book">

          <button id="btn-edit" onClick={editInput}>
            <span><img alt="edit" src='../assets/edit.png'></img></span>
          </button>
          <div className="book-title">
              <h4>{bookData.title}</h4>
              <input 
                className="inputColap" 
                type="text" 
                placeholder={bookData.title}    
                onChange={(event)=>{setNewTitle(event.target.value)}}>
              </input>
          </div>

          <ul>
            <li id="li-ISBN">
              {bookData.ISBN}

             
            </li> 

            <li id="li-Author">
              {bookData.author}
              <input 
                className="inputColap" 
                type="text" 
                placeholder={bookData.author} 
                onChange={(event)=>{setNewAuthor(event.target.value)}}>
              </input>
            </li>

            <li id="li-pages">
              {bookData.pages}
              <input 
                className="inputColap" 
                type="number" 
                placeholder={bookData.pages}
                onChange={(event)=>{setNewPages(event.target.value)}} >
              </input>
            </li>
            <li id="li-copies"> 
              {bookData.copies}
              <input 
                className="inputColap" 
                type="number" 
                placeholder={bookData.copies}
                onChange={(event)=>{setNewCopies(event.target.value)}}></input>
            </li>
          </ul>
          <div className="btnHandle"> 
            <button 
              onClick={()=>{
              deleteBook(bookData.ISBN)
              }}>
              Excluir livro
            </button>
            <button onClick={editBook}>Salvar Alterações</button>       
         </div>
          
      </div>
      

    </div>
  );
}

export default App;
