import React, { useContext, useState, useCallback, useEffect } from "react";
import { GetProducts, CreateCheckoutSession } from "archetype-pricing"


export default function PlanComponent() {

    //const [products, setProducts] = useState(getProducts("1512b14e543842fe844d923ab723c6a2"));
    var tiers = [
      /*{
        name: 'Hobby',
        href: '#',
        priceMonthly: 12,
        description: 'All the basics for starting a new business',
        includedFeatures: ['Potenti felis, in cras at at ligula nunc.', 'Orci neque eget pellentesque.'],
      },
      {
        name: 'Freelancer',
        href: '#',
        priceMonthly: 24,
        description: 'All the basics for starting a new business',
        includedFeatures: [
          'Potenti felis, in cras at at ligula nunc. ',
          'Orci neque eget pellentesque.',
          'Donec mauris sit in eu tincidunt etiam.',
        ],
      },
      {
        name: 'Startup',
        href: '#',
        priceMonthly: 32,
        description: 'All the basics for starting a new business',
        includedFeatures: [
          'Potenti felis, in cras at at ligula nunc. ',
          'Orci neque eget pellentesque.',
          'Donec mauris sit in eu tincidunt etiam.',
          'Faucibus volutpat magna.',
        ],
      },
      {
        name: 'Enterprise',
        href: '#',
        priceMonthly: 48,
        description: 'All the basics for starting a new business',
        includedFeatures: [
          'Potenti felis, in cras at at ligula nunc. ',
          'Orci neque eget pellentesque.',
          'Donec mauris sit in eu tincidunt etiam.',
          'Faucibus volutpat magna.',
          'Id sed tellus in varius quisque.',
          'Risus egestas faucibus.',
          'Risus cursus ullamcorper.',
        ],
      },*/
    ]

    function CheckoutSessionUrl(tierId) {
      var result = null
      console.log("output" + result)
      CreateCheckoutSession(
        "1512b14e543842fe844d923ab723c6a2", 
        tierId, 
        "behailukt@gmail.com").then(function(response) {
          result = response 
          console.log("output" + result)
        })
  
      return result;
    }
    useEffect(() => {
      // Some initialization logic here
      var result = []
      GetProducts("1512b14e543842fe844d923ab723c6a2").then(function(response) {
        //console.log(response);
        tiers = response
        //setProducts(response)
    
        return response;
      });
      return result;
    }, []);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">Pricing Plans</h1>
          <p className="mt-5 text-xl text-gray-500 sm:text-center">
            Start building for free, then add a site plan to go live. Account plans unlock additional features.
          </p>
          <div className="relative self-center mt-6 bg-gray-100 rounded-lg p-0.5 flex sm:mt-8">
            <button
              type="button"
              className="relative w-1/2 bg-white border-gray-200 rounded-md shadow-sm py-2 text-sm font-medium text-gray-900 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8"
            >
              Monthly billing
            </button>
            <button
              type="button"
              className="ml-0.5 relative w-1/2 border border-transparent rounded-md py-2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8"
            >
              Yearly billing
            </button>
          </div>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
          {tiers.map((tier) => (
            <div key={tier.name} className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="p-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">{tier.name}</h2>
                <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">${tier.price}</span>{' '}
                  <span className="text-base font-medium text-gray-500">/mo</span>
                </p>
                <a
                  href={this.CheckoutSessionUrl(tier.tier_id)}
                  className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                >
                  Buy {tier.name}
                </a>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {tier.users.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      {/*<CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />*/}
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
