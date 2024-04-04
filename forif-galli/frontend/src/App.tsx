import Root from "./routes/root";

function App() {
  // const [showInitial, setShowInitial] = useState(false);
  // useEffect(() => {
  //   const hasVisited = localStorage.getItem("hasVisited");

  //   if (hasVisited !== "true") {
  //     setShowInitial(true);
  //     // Set the 'hasVisited' flag in localStorage
  //     localStorage.setItem("hasVisited", "true");
  //   }
  // }, []);

  return (
    <main className="main-screen">
      {/* {showInitial && <InitialScreen />} */}
      <Root />
    </main>
  );
}

export default App;
