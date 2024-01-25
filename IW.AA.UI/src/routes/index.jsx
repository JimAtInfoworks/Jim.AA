import React from 'react';
import { Button } from 'primereact/button';
import { CustomCard } from '../ui/components/card/card';

const cardData = [
  {
    icon: "pi-users",
    title: "Easy to Use",
    bodyText: "Posuere morbi leo urna molestie."
  },
  {
    icon: "pi-palette",
    title: "Fresh Design",
    bodyText: "Semper risus in hendrerit."
  },
  {
    icon: "pi-map",
    title: "Well Documented",
    bodyText: "Non arcu risus quis varius quam quisque."
  }
]

export default function Index() {
  return (
    <>
      <div
        id="hero"
        className="flex flex-column pt-4 px-4 lg:px-8 overflow-hidden"
        style={{
          background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EEEFAF 0%, #C3E3FA 100%)',
          clipPath: 'ellipse(150% 87% at 93% 13%)'
        }}
      >
        <div className="mx-4 md:mx-8 mt-0 md:mt-4">
          <h1 className="text-6xl font-bold text-gray-900 line-height-2">
            <span className="font-light block">Infoworks</span>Application Accelerator
          </h1>
          <p className="font-normal text-2xl line-height-3 md:mt-3 text-gray-700">Get started quickly... </p>
          <a href="https://dev.azure.com/infoworks-tn/Application%20Accelerator/_git/ApplicationAccelerator" target="_blank">
            <Button type="button" label="Get Started" link className="text-xl border-none mt-3 bg-blue-500 font-normal line-height-3 px-3 text-white"></Button>
          </a>
        </div>
        <div className="flex justify-content-center md:justify-content-end">
          <img src="/images/screen-1.png" alt="Hero Image" className="w-9 md:w-auto" />
        </div>
      </div>

      <div id="features" className="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8">
        <div className="grid justify-content-center">
          <div className="col-12 text-center mt-8 mb-4">
            <h2 className="text-900 font-normal mb-2">Marvelous Features</h2>
          </div>

          {cardData?.map(card => {
            return (
              <div className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
                <CustomCard icon={card.icon} title={card.title} bodyText={card.bodyText} />
              </div>
            )
          })}
            
          <div
            className="col-12 mt-8 mb-8 p-2 md:p-8"
            style={{
              borderRadius: '20px',
              background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EFE1AF 0%, #C3DCFA 100%)'
            }}
          >
            <div className="flex flex-column justify-content-center align-items-center text-center px-3 py-3 md:py-0">
              <h3 className="text-gray-900 mb-2">Joséphine Miller</h3>
              <span className="text-gray-600 text-2xl">Peak Interactive</span>
              <p className="text-gray-900 sm:line-height-2 md:line-height-4 text-2xl mt-4" style={{ maxWidth: '800px' }}>
                “Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.”
              </p>
              <img src="/vite.svg" className="mt-4" alt="Company logo" width={80} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}