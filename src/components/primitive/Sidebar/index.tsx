import Modal from '@components/compound/Modal';
import FormModalSubscribe from '@containers/InsightsDetailArticle/FormModalSubscribe';
import InsightsSubscribe from '@containers/InsightsDetailArticle/Subscribe';
import sideBarStyle from '@scss/components/sidebar.scss';
import { map } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SideBarComponent({ config, relate }: any) {
  const router = useRouter();
  const { id }: any = router.query;
  const path = router.asPath.replace(id, '');
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    function displayMessage() {
      setIsOpen(true);
      document.getElementById('handleForm').onclick = toggle;
    }
    const btn = document.getElementById('handleForm');
    btn?.addEventListener('click', displayMessage);
  });
  return (
    <>
      <style jsx>{sideBarStyle}</style>
      <div className="ibc-sidebar">
        <div className="App">
          <Modal open={isOpen} onClose={toggle} isClose handleClose={toggle}>
            <FormModalSubscribe></FormModalSubscribe>
          </Modal>
        </div>

        <div className="ibc-sidebar-cusstom" dangerouslySetInnerHTML={{ __html: config }} />

        <div className="ibc-sidebar__article">
          <h2>Realted Articles</h2>
          {map(relate, (item, index) => (
            <div className="ibc-sidebar__article__item" key={`${index}`.toString()}>
              <Link href={`${path}${item.keyword}`}>
                <a target="_self" title={item.name} href={`${path}${item.keyword}`}>
                  <img src={item.icon} alt={item.name} width="267" height="200" />
                  {item.name}
                </a>
              </Link>
            </div>
          ))}
        </div>
        <div className="ibc__mobile__fix">
          <InsightsSubscribe />
        </div>
      </div>
    </>
  );
}
