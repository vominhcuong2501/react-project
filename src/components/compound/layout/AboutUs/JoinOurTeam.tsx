import { useMounted } from '@hooks/useMounted';
import { getConfigOurTeam } from '@redux/common/selectors';
import { useAppSelector } from '@redux/hooks';
import buttonStyle from '@scss/components/custom-button-expand.scss';
import layoutStyle from '@scss/components/join-our-team.scss';
import { getConfig } from '@utils/helpers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function JoinOurTeam() {
  const router = useRouter();

  const isMounted = useMounted();
  useEffect(() => {
    const handleClick = () => {
      router.push('/career');
    };
    const btnJoinOurTeam = document.getElementById('ibc-btn-join-our-team');
    btnJoinOurTeam?.addEventListener('click', () => {
      handleClick();
    });

    return () => {
      btnJoinOurTeam?.removeEventListener('click', handleClick);
    };
  }, [isMounted]);

  return (
    <section>
      <style jsx>{buttonStyle}</style>
      <style jsx>{layoutStyle}</style>
      <div className="ibc-container-team-group">
        <div dangerouslySetInnerHTML={{ __html: getConfig(useAppSelector(getConfigOurTeam)) }} />
      </div>
    </section>
  );
}
