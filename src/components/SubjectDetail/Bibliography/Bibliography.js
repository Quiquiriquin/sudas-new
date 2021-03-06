import React, { useContext, useEffect, useState } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { useQuery } from 'react-query';
import FormWrapper from '../../Forms/FormWrapper';
import SearchBibliographyForm from '../../Forms/SearchBibliographyForm';
import Button from '../../Shared/Buttons/Button';
import BibliographyModal from '../../Shared/Modals/BibliographyModal';
import { SubjectContext } from '../../../context/SubjectContext';
import { GET_SUBJECT_BIBLIO } from '../../../helpers/BibliographyEndpoints';
import BibliographyItem from './BibliographyItem';

const Bibliography = () => {
  const { subject } = useContext(SubjectContext);
  const [biblio, setBiblio] = useState({});
  const [hasAllBasic, setHasAllBasic] = useState(false);
  const [completeBasic, setCompleteBasic] = useState(false);
  const { data: biblipographiesData } = useQuery(
    ['bibliography', subject?.id],
    GET_SUBJECT_BIBLIO,
    {
      enabled: !!subject,
    }
  );

  const openModal = async () => {
    NiceModal.show(BibliographyModal, {
      subject,
      hasAllBasic,
      completeBasic,
    });
  };

  useEffect(() => {
    if (biblipographiesData && biblipographiesData.status !== 204) {
      const { data } = biblipographiesData;
      if (data) {
        console.log(data);
        setBiblio(data);
        if (data?.basic) {
          const currentYear = new Date().getFullYear();
          let counter = 0;
          data?.basic?.forEach(({ year }) => {
            const auxYear = parseInt(year || 0, 10);
            if (currentYear - auxYear >= 5) {
              counter += 1;
            }
          });
          if (counter > 2) {
            setHasAllBasic(() => true);
          }
          if (data?.basic?.length === 5) {
            setCompleteBasic(true);
          }
          console.log(counter);
        }
      }
    }
  }, [biblipographiesData]);

  return (
    <div>
      <div>
        <Button onClick={openModal}>Añadir</Button>
      </div>
      <hr className="my-4" />
      <div>
        <ul>
          <li>
            <div className="unit-item flex justify-between">
              <p>Bibliografía básica</p>
            </div>
            <div className="mb-10">
              <ul>
                {biblio?.basic &&
                  biblio?.basic?.map((elem) => (
                    <BibliographyItem key={elem?.id} {...elem} />
                  ))}
              </ul>
            </div>
          </li>
          <li>
            <div className="unit-item flex justify-between">
              <p>Bibliografía complementaria</p>
            </div>
            <div className="mb-10">
              <ul>
                {biblio?.complementary &&
                  biblio?.complementary?.map((elem) => (
                    <BibliographyItem key={elem?.id} {...elem} />
                  ))}
              </ul>
            </div>
          </li>
          <li>
            <div className="unit-item flex justify-between">
              <p>Cibergrafía</p>
            </div>
            <div className="mb-10">
              <ul>
                {biblio?.cyber &&
                  biblio?.cyber?.map((elem) => (
                    <BibliographyItem key={elem?.id} {...elem} />
                  ))}
              </ul>
            </div>
          </li>
          <li>
            <div className="unit-item flex justify-between">
              <p>Recursos digitales</p>
            </div>
            <div className="mb-10">
              <ul>
                {biblio?.digital &&
                  biblio?.digital?.map((elem) => (
                    <BibliographyItem key={elem?.id} {...elem} />
                  ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Bibliography;
