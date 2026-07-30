import {useEffect,useState} from 'react'
import styles from './converter.module.css'
function CurrencyConverter() {
    const[countries,setCountries]=useState([{}])
    const[value,setValue]=useState("");
    const[rates,setRates]=useState(0);
    const[to,setTo]=useState("USD");
    const[from,setFrom]=useState("PKR");
    const[btn,setBtn]=useState(false);
    const[exchangeRate,setExchnageRate]=useState("");
    const[toggle,setToggle]=useState({
      toggle1:false,
      toggle2:false
    });
    const[currency,setCurrency]=useState({
      currency1:from,
      currency2:to
    });
    useEffect(()=>{
   fetch('currencies.json').then(response=>response.json()).then(result=>{

let currency_code=result.map(item=>({
   code:item.code,
   flag:item.flag
}))
setCountries(currency_code);
   })
   
   },[])
   const handleChange=(target)=>{
    let numbers= target.value.replace(/[^0-9]/g,"");
         setValue(numbers)
   }
   const handleClick=(val,current)=>{
    setCurrency((prev)=>({
      ...prev,
      [current]:val
    }))
    setBtn(false)
   }
   useEffect(() => {
  setFrom(currency.currency1);
  setTo(currency.currency2);
}, [currency]);
   const Toggle=(state1,state2)=>{
  setToggle((prev) => ({
    ...prev,
    [state1]: !prev[state1],
    [state2]:prev[state2]? !prev[state2] : prev[state2]
  }));
};
  useEffect(()=>{

  fetch(`https://v6.exchangerate-api.com/v6/479fa79f03a79d1b8d0dff6c/latest/${from}`)
    .then(res => res.json())
    .then(data => {
     let toCurrency=data.conversion_rates[to];
      setExchnageRate(toCurrency);

}); },
[from,to])
   const convert=()=>{
    let amount=Number(value);
    let rating=Number(exchangeRate);
   let converto=(amount * rating).toFixed(2) ;
   setRates(converto)
   setBtn(true)
   }
   const swipe=()=>{
    setFrom(currency.currency2);
    setTo(currency.currency1);
     setCurrency({
      currency1:to,
      currency2:from
   })
  }
  return (
    <div>
       <h2 className={styles.head}>CURRENCY CONVERTER</h2>
         <div className={styles.parent}>
          <input placeholder="Amount..." className={styles.input} value={value} onChange={(e)=>handleChange(e.target)}></input>
          <div className={styles.wrapper}>
          <div className={styles.box}>
          <div className={styles.select}>
            <p>{currency.currency1}</p>
            <img  onClick={()=>Toggle("toggle1","toggle2")} src="/images/dropdown.svg"></img>
          </div>
          {
            toggle.toggle1 &&
 <div className={styles.dropdown}>
            <ul>
         {
           countries.map((val,index)=>(
              <div className={styles.container} key={index}>
                  <img src={val.flag} ></img>
                <li onClick={(e)=>handleClick(val.code,"currency1")} >{val.code}</li></div>
              ))
            
            }
            </ul>
          
          </div>
          }
         
          </div>
          <div className={styles.image} onClick={swipe}><img src="/images/conversion.png"></img></div>
          <div className={styles.box}>
          <div className={styles.select}>
            <p>{currency.currency2}</p>
            <img onClick={()=>Toggle("toggle2","toggle1")} src="/images/dropdown.svg"></img>
          </div>
          {
            toggle.toggle2 && 
             <div className={styles.dropdown}>
            <ul>
         {
              countries.map((val,index)=>(
              
                <div className={styles.container} key={index}>
                  <img src={val.flag} ></img>
                <li onClick={(e)=>handleClick(val.code,"currency2")} >{val.code}</li></div>
              ))
            }
            </ul>
          
          </div>
          
            
          }
         
          </div>
         </div>
         <button className={styles.btn} onClick={convert}>Convert</button>
         {
          btn ?  <p className={styles.para}>{value} {from} ={rates} {to}</p> :  <p className={styles.para}>1 {from} ={exchangeRate} {to}</p>
         }
        
         </div>
       
    </div>
  )
}

export default CurrencyConverter
