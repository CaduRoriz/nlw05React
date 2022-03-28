import { useState } from "react";

export default function Button(props) {
    const [counter, setCounter] = useState(0);
   
    function increment (){
         setCounter(counter + 1);
    }

    return (
         <button onClick= {increment}>{counter}{props.children}</button>
        
        );
}