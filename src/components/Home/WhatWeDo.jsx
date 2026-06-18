import { useState } from "react";

const spaces = [
  {
    id: 1,
    image: "./images/one.png",
    title: "Volunteer Programs",
  },
  {
    id: 2,
    image: "./images/two.png",
    title: "Donation Drives",
  },
  {
    id: 3,
    image: "./images/three.png",
    title: "Food Distribution",
  },
  {
    id: 4,
    image: "./images/four.png",
    title: "Education Support",
  },
  {
    id: 5,
    image: "./images/five.png",
    title: "Healthcare Camps",
  },
  {
    id: 6,
    image: "./images/six.png",
    title: "CSR Partnerships",
  },
  {
    id: 7,
    image: "./images/seven.png",
    title: "Community Development",
  },
];

export default function ExploreSpaces() {
  const [activeCard, setActiveCard] = useState(1);

  return (
    <section className="bg-[#F5F2EE] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
       <div className="text-center mb-12">
  <span className="text-xs tracking-[5px] text-[#5C6F5C] font-semibold mb-3 inline-block uppercase">
    Our Impact
  </span>

  {/* Underline */}
  <div className="w-16 h-[2px] bg-[#5C6F5C] mx-auto"></div>

  <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-sm">
    Through our collective efforts, we're transforming lives,
    providing essential resources, and creating lasting change
    for communities in need.
  </p>
</div>

        {/* Gallery - EXACT same animation */}
        <div className="flex justify-center gap-3 h-[420px]">
          {spaces.map((space) => (
            <div
              key={space.id}
              onMouseEnter={() => setActiveCard(space.id)}
              className={`
                relative overflow-hidden rounded-[20px]
                cursor-pointer
                transition-all duration-700 ease-in-out
                ${
                  activeCard === space.id
                    ? "w-[420px]"
                    : "w-[70px]"
                }
              `}
            >
              <img
                src={space.image}
                alt={space.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay - using #5C6F5C */}
              <div className="absolute inset-0 bg-[#5C6F5C]/15" />

              {/* Title - EXACT same animation */}
              <div
                className={`
                  absolute bottom-5 left-5
                  transition-all duration-500
                  ${
                    activeCard === space.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }
                `}
              >
                <h3 className="text-white text-2xl font-semibold">
                  {space.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}