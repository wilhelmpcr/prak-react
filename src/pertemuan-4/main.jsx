import { createRoot } from "react-dom/client";
import frameworkData from "./framework.json";
import './tailwind.css';
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
import ResponsiveDesign from "./ResponsiveDesign";


createRoot(document.getElementById("root"))
    .render(
        <div>

          <ResponsiveDesign/>
           <FrameworkListSearchFilter/>
           
        </div>
    )