const Page = () => {
    // State to track which component to render
    const [currentComponent, setCurrentComponent] = useState(null);
  
    // Function to handle button clicks and set the current component
    const handleButtonClick = (componentName) => {
      switch (componentName) {
        case 'Component1':
          setCurrentComponent(<Component1 />);
          break;
        case 'Component2':
          setCurrentComponent(<Component2 />);
          break;
        case 'Component3':
          setCurrentComponent(<Component3 />);
          break;
        default:
          setCurrentComponent(null);
      }
    };
  
    return (
      <div>
        <button onClick={() => handleButtonClick('Component1')}>Show Component 1</button>
        <button onClick={() => handleButtonClick('Component2')}>Show Component 2</button>
        <button onClick={() => handleButtonClick('Component3')}>Show Component 3</button>
  
        {/* Render the current component based on state */}
        {currentComponent}
      </div>
    );
  }
  
  export default Page;