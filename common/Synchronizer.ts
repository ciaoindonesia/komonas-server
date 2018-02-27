import { Province } from "../models/Province";
import { Kabupaten } from "../models/Kabupaten";
import { User } from "../models/User";
import { Comodity } from "../models/Comodity";
import { Auth } from "../models/Auth";
import { Master } from "../models/Master";


let run = async () => {
    try {
        /*await User.sync({ force: true });
        await Auth.sync({ force: true });
        await Province.sync({ force: true });
        await Kabupaten.sync({ force: true });
        await Comodity.sync({ force: true });
        await Master.sync({ force: true });*/
        await Province.sync({ force: true });
        await Kabupaten.sync({ force: true });
        await Comodity.sync({ force: true });
        await Master.sync({ force: true });
    }
    catch(error) {
        console.log(error);
    }
}

run();