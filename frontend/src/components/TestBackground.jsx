const TestBackground = () => {
    return (
      <div
        className="h-screen w-screen flex items-center justify-center text-white text-4xl font-bold"
        style={{
          backgroundImage: "url('/galaxy.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        🚀 Galaxy Image Test
      </div>
    );
  };
  
  export default TestBackground;
  