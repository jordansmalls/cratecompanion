import { useAuthStore } from "../store/authStore";
import Navbar from "../components/navbar/Navbar";
import { Button } from "../components/ui/button";
import Footer from "../components/footer/Footer";

const Dashboard = () => {

    const user = useAuthStore((state) => state.user)
    return (
        <>
        <Navbar />
        <div className="flex place-items-center flex-col gap-5 lg:mt-[10rem]">

          <div>
            <Button className="w-[30rem] h-[5rem] rounded-3xl">Import New Tracklist</Button>
          </div>

          <div>
                <Button className="w-[30rem] h-[5rem] rounded-3xl" variant={"outline"}>View Tracklists</Button>
          </div>


        </div>
        <div className="mt-[10rem]" >
            <Footer/>
        </div>
        </>
     );
}

export default Dashboard;