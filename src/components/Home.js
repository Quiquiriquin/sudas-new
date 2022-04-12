import React, { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';
import menuSVG from '../assets/icons/menu.svg';
import layerSVG from '../assets/icons/layers.svg';
import usersSVG from '../assets/icons/users.svg';
import gridSVG from '../assets/icons/grid.svg';
import plusSVG from '../assets/icons/plus.svg';
import bookSVG from '../assets/icons/Book.svg';
import types from '../types/types';
// import FormInput from './Shared/FormInputs/FormInput';

const Home = () => {
  // const { user, dispatch } = useContext(GeneralContext);

  // const { name, firstSurname } = user.userInfo;

  // const handleLogout = () => {
  //   dispatch({
  //     type: types.logout,
  //   });
  // };

  return (
    <div className="flex flex-row w-screen h-screen">
      <div className=" bg-prusian-blue p-2 flex-initial">
        <div className="flex flex-col">
          <div className="p-2">
            <img src={menuSVG} className="w-6" alt="icon menu" />
          </div>
          <div className="p-2">
            <img src={layerSVG} className="w-6" alt="icon menu" />
          </div>
          <div className="p-2">
            <img src={usersSVG} className="w-6" alt="icon menu" />
          </div>
          <div className="p-2">
            <img src={gridSVG} className="w-6" alt="icon menu" />
          </div>
        </div>
      </div>
      <div className="flex flex-col border-white p-10 flex-1 bg-platinum space-y-10">
        <div className="bg-white rounded p-2 shadow flex-initial">
          <h1 className="text-lg">
            {/* Hola, {name} {firstSurname} */}
            Hola, Davi asdasd
          </h1>
        </div>
        <div className="bg-white rounded p-5 shadow flex-auto">
          <div className="flex flex-col">
            <div className="flex flex-row p-5 justify-around">
              <div className="p-4 w-56 h-28 bg-blue-400 rounded text-center text-prusian-blue shadow-lg">
                <p className="text-xl font-bold">20</p>
                <p className="text-base">Jefes de academia</p>
              </div>
              <div className="p-4 w-56 h-28 bg-blue-400 rounded text-center text-prusian-blue shadow-lg">
                <p className="text-xl font-bold">40</p>
                <p className="text-base">Responsables de Unidad</p>
              </div>
              <div className="p-4 w-56 h-28 bg-blue-400 rounded text-center text-prusian-blue shadow-lg">
                <p className="text-xl font-bold">100</p>
                <p className="text-base">Maestros</p>
              </div>
            </div>
            <div className="flex flex-row justify-between p-5">
              <div className="flex flex-row items-center">
                <div className="bg-prusian-blue rounded-full p-2">
                  <img src={plusSVG} alt="plusSVG" />
                </div>
                <p className="ml-2">Agregar usuario</p>
              </div>
              <div>
                {/* <FormInput
                  name="search"
                  label="Buscar"
                  defaultValue=""
                  placeholder="Buscar"
                  rules={{
                    required: 'Ingresa algo',
                  }}
                /> */}
                Buscar
              </div>
            </div>
            <div className="flex flex-row p-5 flex-wrap justify-between">
              <div className="p-4 w-56 h-28 bg-blue-400 rounded text-center flex flex-row text-white shadow-lg m-5">
                <div>
                  <img src={bookSVG} alt="books" className="w-16" />
                </div>
                <div className="text-prusian-blue">
                  <p className="text-xl font-bold">
                    Unidades Academicas
                  </p>
                  <p className="text-base">cantidad: 8</p>
                </div>
              </div>
              <div className="p-4 w-56 h-28 bg-blue-400 rounded text-center flex flex-row text-white shadow-lg m-5">
                <div>
                  <img src={bookSVG} alt="books" className="w-16" />
                </div>
                <div className="text-prusian-blue">
                  <p className="text-xl font-bold">
                    Unidades Academicas
                  </p>
                  <p className="text-base">cantidad: 8</p>
                </div>
              </div>
              <div className="p-4 w-56 h-28 bg-blue-400 rounded text-center flex flex-row text-white shadow-lg m-5">
                <div>
                  <img src={bookSVG} alt="books" className="w-16" />
                </div>
                <div className="text-prusian-blue">
                  <p className="text-xl font-bold">
                    Unidades Academicas
                  </p>
                  <p className="text-base">cantidad: 8</p>
                </div>
              </div>
              <div className="p-4 w-56 h-28 bg-blue-400 rounded text-center flex flex-row text-white shadow-lg m-5">
                <div>
                  <img src={bookSVG} alt="books" className="w-16" />
                </div>
                <div className="text-prusian-blue">
                  <p className="text-xl font-bold">
                    Unidades Academicas
                  </p>
                  <p className="text-base">cantidad: 8</p>
                </div>
              </div>
              <div className="p-4 w-56 h-28 bg-blue-400 rounded text-center flex flex-row text-white shadow-lg m-5">
                <div>
                  <img src={bookSVG} alt="books" className="w-16" />
                </div>
                <div className="text-prusian-blue">
                  <p className="text-xl font-bold">
                    Unidades Academicas
                  </p>
                  <p className="text-base">cantidad: 8</p>
                </div>
              </div>
              <div className="p-4 w-56 h-28 bg-blue-400 rounded text-center flex flex-row text-white shadow-lg m-5">
                <div>
                  <img src={bookSVG} alt="books" className="w-16" />
                </div>
                <div className="text-prusian-blue">
                  <p className="text-xl font-bold">
                    Unidades Academicas
                  </p>
                  <p className="text-base">cantidad: 8</p>
                </div>
              </div>
              <div className="p-4 w-56 h-28 bg-blue-400 rounded text-center flex flex-row text-white shadow-lg m-5">
                <div>
                  <img src={bookSVG} alt="books" className="w-16" />
                </div>
                <div className="text-prusian-blue">
                  <p className="text-xl font-bold">
                    Unidades Academicas
                  </p>
                  <p className="text-base">cantidad: 8</p>
                </div>
              </div>
              <div className="p-4 w-56 h-28 bg-blue-400 rounded text-center flex flex-row text-white shadow-lg m-5">
                <div>
                  <img src={bookSVG} alt="books" className="w-16" />
                </div>
                <div className="text-prusian-blue">
                  <p className="text-xl font-bold">
                    Unidades Academicas
                  </p>
                  <p className="text-base">cantidad: 8</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
