import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const phoneModels = {
  Apple: {
    'iPhone 13 Pro Max': ['128GB', '256GB', '512GB', '1TB'],
    'iPhone 13 Pro': ['128GB', '256GB', '512GB', '1TB'],
    'iPhone 13': ['128GB', '256GB', '512GB'],
    'iPhone 13 Mini': ['128GB', '256GB', '512GB'],
    'iPhone 12 Pro Max': ['128GB', '256GB', '512GB'],
    'iPhone 12 Pro': ['128GB', '256GB', '512GB'],
    'iPhone 12': ['64GB', '128GB', '256GB'],
    'iPhone 12 Mini': ['64GB', '128GB', '256GB'],
    'iPhone 11 Pro Max': ['64GB', '256GB', '512GB'],
    'iPhone 11 Pro': ['64GB', '256GB', '512GB'],
    'iPhone 11': ['64GB', '128GB', '256GB'],
    'iPhone XS Max': ['64GB', '256GB', '512GB'],
    'iPhone XS': ['64GB', '256GB', '512GB'],
    'iPhone XR': ['64GB', '128GB', '256GB'],
    'iPhone X': ['64GB', '256GB'],
    'iPhone 8 Plus': ['64GB', '256GB'],
    'iPhone 8': ['64GB', '256GB'],
    'iPhone 7 Plus': ['32GB', '128GB', '256GB'],
    'iPhone 7': ['32GB', '128GB', '256GB'],
    'iPhone 6s Plus': ['16GB', '32GB', '64GB', '128GB'],
    'iPhone 6s': ['16GB', '32GB', '64GB', '128GB'],
    'iPhone SE (2nd generation)': ['64GB', '128GB', '256GB'],
    'iPhone SE (1st generation)': ['16GB', '32GB', '64GB', '128GB'],
  },
  Samsung: {
    'Galaxy S21 Ultra': ['128GB', '256GB', '512GB'],
    'Galaxy S21+': ['128GB', '256GB'],
    'Galaxy S21': ['128GB', '256GB'],
    'Galaxy S20 Ultra': ['128GB', '256GB', '512GB'],
    'Galaxy S20+': ['128GB', '256GB', '512GB'],
    'Galaxy S20': ['128GB'],
    'Galaxy Note 20 Ultra': ['256GB', '512GB'],
    'Galaxy Note 20': ['256GB'],
    'Galaxy A52': ['128GB', '256GB'],
    'Galaxy A72': ['128GB', '256GB'],
    'Galaxy Z Fold3': ['256GB', '512GB'],
    'Galaxy Z Flip3': ['128GB', '256GB'],
    'Galaxy S10+': ['128GB', '512GB', '1TB'],
    'Galaxy S10': ['128GB', '512GB'],
    'Galaxy S10e': ['128GB', '256GB'],
    'Galaxy Note 10+': ['256GB', '512GB'],
    'Galaxy Note 10': ['256GB'],
    'Galaxy A51': ['64GB', '128GB'],
    'Galaxy A71': ['128GB'],
  },
  Otro: {}
};

const batteryHealthRanges = [
  { value: 'below-70', label: 'Menos del 70%' },
  { value: '70-80', label: '70% - 80%' },
  { value: '80-90', label: '80% - 90%' },
  { value: '90-100', label: '90% - 100%' },
];

const screenConditions = [
  {
    value: 'roto',
    label: 'Roto',
    description: 'Tiene una o más grietas y puede que no funcione al 100%.',
    details: [
      'La pantalla tiene grietas visibles.',
      'Puede haber áreas que no responden al tacto.',
      'Posibles problemas de visualización en ciertas áreas.'
    ]
  },
  {
    value: 'usado',
    label: 'Usado',
    description: 'Marcas de uso visibles, incluidos rasguños profundos, abolladuras o ambas cosas en la parte exterior del dispositivo, que no afectan a su funcionalidad. Sin grietas. La pantalla no tiene píxeles defectuosos y la pantalla táctil funciona.',
    details: [
      'Rasguños visibles en la superficie de la pantalla.',
      'Posibles pequeñas abolladuras en los bordes.',
      'La funcionalidad táctil y visual está intacta.'
    ]
  },
  {
    value: 'bueno',
    label: 'Bueno',
    description: 'Pequeñas marcas de uso, imperceptibles a 20 cm de distancia. Sin grietas ni golpes. La pantalla no tiene píxeles defectuosos y la pantalla táctil funciona.',
    details: [
      'Mínimos signos de uso, apenas perceptibles.',
      'Sin daños estructurales.',
      'Funcionamiento perfecto de la pantalla y el tacto.'
    ]
  },
  {
    value: 'impecable',
    label: 'Impecable',
    description: 'Aspecto impecable sin rasguños visibles. La pantalla no tiene píxeles defectuosos y la pantalla táctil funciona.',
    details: [
      'Sin marcas de uso visibles.',
      'Apariencia como nueva.',
      'Funcionamiento óptimo de todas las funciones de la pantalla.'
    ]
  }
];

const physicalConditions = [
  {
    value: 'roto',
    label: 'Roto',
    description: 'Tiene marcas de uso visibles, incluyendo rasguños profundos y golpes y/o marcas en la parte exterior del producto.',
    details: [
      'Daños estructurales visibles.',
      'Posibles problemas de funcionamiento debido al daño físico.',
      'Puede requerir reparación para su uso óptimo.'
    ]
  },
  {
    value: 'usado',
    label: 'Usado',
    description: 'Tiene marcas de uso visibles, incluyendo rasguños profundos y golpes y/o marcas en la parte exterior del producto, sin afectar a su funcionamiento. Sin grietas.',
    details: [
      'Signos claros de uso previo.',
      'Rasguños o abolladuras en la carcasa o bordes.',
      'Funcionamiento normal a pesar de las marcas externas.'
    ]
  },
  {
    value: 'bueno',
    label: 'Bueno',
    description: 'Pequeñas marcas de uso, imperceptibles a 20 cm de distancia. Sin grietas ni golpes.',
    details: [
      'Mínimos signos de uso, difíciles de detectar.',
      'Sin daños estructurales o marcas significativas.',
      'Apariencia general muy buena.'
    ]
  },
  {
    value: 'impecable',
    label: 'Impecable',
    description: 'Aspecto impecable sin rasguños visibles.',
    details: [
      'Condición casi como nueva.',
      'Sin marcas de uso detectables.',
      'Apariencia y funcionamiento perfectos.'
    ]
  }
];

const Quoter: React.FC = () => {
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [storage, setStorage] = useState<string>('');
  const [batteryHealth, setBatteryHealth] = useState<string>('');
  const [screenCondition, setScreenCondition] = useState<string>('');
  const [physicalCondition, setPhysicalCondition] = useState<string>('');

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBrand(e.target.value);
    setModel('');
    setStorage('');
    setBatteryHealth('');
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value);
    setStorage('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Convierte tu antiguo smartphone en dinero</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <form className="space-y-6">
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Marca</label>
              <select
                id="brand"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={brand}
                onChange={handleBrandChange}
              >
                <option value="">Selecciona una marca</option>
                {Object.keys(phoneModels).map((brandName) => (
                  <option key={brandName} value={brandName}>{brandName}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700">Modelo</label>
              <select
                id="model"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={model}
                onChange={handleModelChange}
                disabled={!brand}
              >
                <option value="">Selecciona un modelo</option>
                {brand && phoneModels[brand] && Object.keys(phoneModels[brand]).map((modelName) => (
                  <option key={modelName} value={modelName}>{modelName}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="storage" className="block text-sm font-medium text-gray-700">Almacenamiento</label>
              <select
                id="storage"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
                disabled={!model}
              >
                <option value="">Selecciona el almacenamiento</option>
                {brand && model && phoneModels[brand][model] && phoneModels[brand][model].map((storageOption) => (
                  <option key={storageOption} value={storageOption}>{storageOption}</option>
                ))}
              </select>
            </div>

            {brand === 'Apple' && (
              <div>
                <label htmlFor="batteryHealth" className="block text-sm font-medium text-gray-700">Salud de la batería</label>
                <select
                  id="batteryHealth"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={batteryHealth}
                  onChange={(e) => setBatteryHealth(e.target.value)}
                  disabled={!storage}
                >
                  <option value="">Selecciona la salud de la batería</option>
                  {batteryHealthRanges.map((range) => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado de la pantalla</label>
              {screenConditions.map((condition) => (
                <div key={condition.value} className="flex items-start mb-4">
                  <div className="flex items-center h-5">
                    <input
                      id={`screen-${condition.value}`}
                      name="screenCondition"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      value={condition.value}
                      checked={screenCondition === condition.value}
                      onChange={(e) => setScreenCondition(e.target.value)}
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor={`screen-${condition.value}`} className="font-medium text-gray-700">{condition.label}</label>
                    <p className="text-gray-500">{condition.description}</p>
                    <ul className="list-disc list-inside text-sm text-gray-500 mt-1">
                      {condition.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado físico del dispositivo</label>
              {physicalConditions.map((condition) => (
                <div key={condition.value} className="flex items-start mb-4">
                  <div className="flex items-center h-5">
                    <input
                      id={`physical-${condition.value}`}
                      name="physicalCondition"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      value={condition.value}
                      checked={physicalCondition === condition.value}
                      onChange={(e) => setPhysicalCondition(e.target.value)}
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor={`physical-${condition.value}`} className="font-medium text-gray-700">{condition.label}</label>
                    <p className="text-gray-500">{condition.description}</p>
                    <ul className="list-disc list-inside text-sm text-gray-500 mt-1">
                      {condition.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>

        <div className="md:w-1/3">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Tu equipo</h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Marca</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{brand || '-'}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Modelo</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{model || '-'}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Almacenamiento</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{storage || '-'}</dd>
                </div>
                {brand === 'Apple' && (
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Salud de la batería</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{batteryHealth ? batteryHealthRanges.find(r => r.value === batteryHealth)?.label : '-'}</dd>
                  </div>
                )}
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Estado de la pantalla</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{screenCondition ? screenConditions.find(c => c.value === screenCondition)?.label : '-'}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Estado físico</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{physicalCondition ? physicalConditions.find(c => c.value === physicalCondition)?.label : '-'}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quoter;