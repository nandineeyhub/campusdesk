

const ApiLoader =() =>{
    return (
    <> 

 
  <div id="overlay">
      <div className="loader"></div>
  </div>

    </>   
    );
  }

  const NoRecordMsg =(props) =>{
    return (
        <div className="d-flex align-items-center justify-content-center">
                  <div className="appointment text-center">
                  
                    <p>{props.title}</p>
                   
                  </div>
                </div>
    );
  }

  export  {ApiLoader, NoRecordMsg}