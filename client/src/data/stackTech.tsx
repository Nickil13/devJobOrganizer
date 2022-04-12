import { FaReact, FaNodeJs } from "react-icons/fa";
import {
    SiRubyonrails,
    SiRuby,
    SiMongodb,
    SiPostgresql,
    SiMysql,
    SiNextdotjs,
    SiPython,
    SiSass,
    SiExpress,
    SiJquery,
    SiMaterialui,
    SiStorybook,
    SiMocha,
    SiJest,
    SiDocker,
    SiJavascript,
    SiHtml5,
    SiCss3,
} from "react-icons/si";

enum techCat {
    Backend = "Backend",
    Frontend = "Frontend",
    Styling = "Styling",
    Testing = "Testing",
    PackageManager = "Package Manager",
    Other = "Other",
}

interface Tech {
    name: string;
    category: string;
    icon: JSX.Element;
}

const tech: Tech[] = [
    {
        name: "JavaScript",
        category: techCat.Frontend,
        icon: <SiJavascript />,
    },
    {
        name: "HTML5",
        category: techCat.Frontend,
        icon: <SiHtml5 />,
    },
    {
        name: "CSS3",
        category: techCat.Frontend,
        icon: <SiCss3 />,
    },
    {
        name: "React",
        category: techCat.Frontend,
        icon: <FaReact />,
    },
    {
        name: "Node.js",
        category: techCat.Backend,
        icon: <FaNodeJs />,
    },
    {
        name: "Rails",
        category: techCat.Backend,
        icon: <SiRubyonrails />,
    },
    {
        name: "Ruby",
        category: techCat.Backend,
        icon: <SiRuby />,
    },
    {
        name: "MongoDB",
        category: techCat.Backend,
        icon: <SiMongodb />,
    },
    {
        name: "MySQL",
        category: techCat.Backend,
        icon: <SiPostgresql />,
    },
    {
        name: "PostgreSQL",
        category: techCat.Backend,
        icon: <SiMysql />,
    },
    {
        name: "Next.js",
        category: techCat.Frontend,
        icon: <SiNextdotjs />,
    },
    {
        name: "Python",
        category: techCat.Backend,
        icon: <SiPython />,
    },
    {
        name: "Sass",
        category: techCat.Styling,
        icon: <SiSass />,
    },
    {
        name: "JQuery",
        category: techCat.Frontend,
        icon: <SiJquery />,
    },
    {
        name: "Express",
        category: techCat.Backend,
        icon: <SiExpress />,
    },
    {
        name: "MUI",
        category: techCat.Styling,
        icon: <SiMaterialui />,
    },
    {
        name: "Storybook",
        category: techCat.Testing,
        icon: <SiStorybook />,
    },
    {
        name: "Mocha",
        category: techCat.Testing,
        icon: <SiMocha />,
    },
    {
        name: "Jest",
        category: techCat.Testing,
        icon: <SiJest />,
    },
    {
        name: "Docker",
        category: techCat.PackageManager,
        icon: <SiDocker />,
    },
];

export { tech };
