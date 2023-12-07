import React,{useCallback,useState} from 'react';
import Navigation from '../Navigation/Navigation'
import Dashboard from '../Dashboard/Dashboard';
import Income from '../Income/Income'
import Expenses from '../Expenses/Expenses';
import { GlobalProvider } from "../../context/globalContext";
import FilterForm from '../FilterData/FilterForm';

export default function Home() {

    const [active, setActive] = useState(1);
   
  const displayData = useCallback(
    () => {
      switch(active){
        case 1:
          return <Dashboard />
        case 2:
          return <FilterForm />
        case 3:
          return <Income />
        case 4: 
          return <Expenses />
        default: 
          return <Dashboard />
      }
    },[active]);
  return (<>
   <GlobalProvider>
    <Navigation active={active} setActive={setActive} />       
    <main>
    {displayData()}
  </main> 
  </GlobalProvider>
  </>);
}
