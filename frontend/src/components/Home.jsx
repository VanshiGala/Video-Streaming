

function Home() {


  return (
    <div>
    <form action="http://localhost:8000/upload" method="POST" encType="multipart/form-data">
    <input type="file" name="file" accept="video/*"/>
    <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default Home;


