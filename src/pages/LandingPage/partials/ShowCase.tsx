import { useState } from "react";
import Heading from "../../../components/Heading";
import data from "../../../data/data.json";

interface ShowcaseItem {
  title: string;
  description: string;
  image: string;
  site: string;
  github: string;
  maintainer: Array<{
    name: string;
    nim: string;
  }>;
}

const ShowCase: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);

  const openModal = (item: ShowcaseItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <section id="showcase" className="w-full h-max py-28 bg-gray-100">
      <div className="flex flex-col items-center justify-start mx-auto h-max md:h-max max-w-3xl 2xl:max-w-7xl lg:max-w-5xl">
        <Heading title="Showcase" />
        <div className="grid grid-cols-1 md:grid-cols-2  gap-5 w-full px-4 py-6">
          {data.showcase.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 xl:p-6 rounded-md shadow-xl cursor-pointer grid grid-cols-1 grid-rows-4"
              onClick={() => openModal(item)}
            >
              <div className="row-span-4 overflow-hidden">
                <img
                  draggable={false}
                  src={item.image}
                  loading="lazy"
                  fetchPriority="high"
                  decoding="async"
                  srcSet={
                    item.image +
                    " 300w, " +
                    item.image + " 768w, " +
                    item.image + " 1280w" +
                    item.image + " 1920w" +
                    item.image + " 2560w"
                  }
                  alt={`image - ${item.title}`}
                  className="w-full h-full object-cover rounded hover:scale-105 hover:grayscale transition-all duration-500"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 mt-4">
                  {item.title}
                </h2>
                <p className="text-gray-600 mt-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full h-full flex items-center justify-center relative">
            <button
              className="absolute z-50 top-5 right-5 text-gray-300 hover:text-gray-400 font-bold text-5xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="bg-white p-6 rounded-lg max-w-lg w-4/5 md:w-full">
              <img
                draggable={false}
                src={selectedItem.image}
                loading="lazy"
                fetchPriority="high"
                decoding="async"
                alt={`image - ${selectedItem.title}`}
                className="w-full h-3/4 object-cover rounded"
              />
              <h2 className="md:text-2xl text-xl font-bold text-gray-800 mt-4">
                {selectedItem.title}
              </h2>
              <p className="text-gray-600 mt-2 md:text-md text-sm">{selectedItem.description}</p>
              <hr />
              <h3 className="md:text-xl text-lg  font-bold text-gray-800 mt-4">
                Maintainers
              </h3>
              <ul className="list-disc ml-6 mt-2">
                {selectedItem.maintainer.map((maintainer, index) => (
                  <li key={index} className="text-xs md:text-sm">
                    {maintainer.name} - {maintainer.nim}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3">
                <a
                draggable={false}
                  href={selectedItem.site}
                  target="_blank"
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4 inline-block hover:bg-indigo-600 text-sm md:text-md select-none"
                >
                  Visit Site
                </a>
                {/* github */}
                <a
                  draggable={false}
                  href={selectedItem.github}
                  target="_blank"
                  className="bg-gray-900 text-white px-4 py-2 rounded-md mt-4 inline-flex items-center gap-3 hover:bg-gray-700 text-sm md:text-md select-none"
                >
                  <img
                    src="/images/github-mark-white.svg"
                    alt="image - github"
                    className="h-4 w-4 md:h-6 md:w-6 object-contain"
                  />
                  Github
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShowCase;
