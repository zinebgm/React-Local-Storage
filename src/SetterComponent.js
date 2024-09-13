import  useLocalStorage  from './useLocalStorage';



const SetterComponent = ()  => {
    const [value, setValue] = useLocalStorage('firstKey', '');


  return (
    <div>
        <h2>Welcome to the Setter Component</h2>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value )} placeholder='Enter the value' />
    </div>
  )
};

export default SetterComponent;