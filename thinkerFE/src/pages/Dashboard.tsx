import { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Plus } from '../icons/Plus';
import { Share } from '../icons/Share';
import { ContentModal } from '../components/ui/Content';
import { useContent } from '../hooks/useContent';
import { SideBar } from '../components/ui/SideBar';
import LinkModel from '../components/ui/Link';
import axios from 'axios';
import { BACKEND_URL, FRONTEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [openModel, setCloseModel] = useState(false);
  const [link, setLink] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null); // To track selected type
  const navi = useNavigate();
  const { contentsData, refresh, linkvalue, setLinkValue } = useContent();

  useEffect(() => {
    refresh();
  }, [openModel, link]);

  function getLink() {
    setLink(true);
    axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
      share: true
    }, {
      headers: {
        "Token": localStorage.getItem("token")
      }
    }).then((response) => {
      setLinkValue(`${FRONTEND_URL}/shareLink/` + response.data.hash);
    });
  }

  function logout() {
    localStorage.removeItem("token");
    if (!localStorage.getItem('token')) {
      console.log('Token successfully removed!');
    }
    navi("/");
  }

  const filteredData = selectedType 
    ? contentsData.filter(({ type }) => type === selectedType) 
    : contentsData;

  return (
    <div className="bg-blue-400 w-full">
      {window.innerWidth < 760 ? (
        <div className="flex flex-col">
          <div className="h-20 bg-green-900 flex justify-between items-center fixed top-0 w-full">
            {/* <div className="min-h-screen relative">
              <SideBar onTypeSelect={setSelectedType} />
            </div> */}
            <ContentModal open={openModel} close={() => setCloseModel(false)} />
            <div className="flex justify-start gap-2 pr-2 ml-8 relative">
              <Button varient="greenlight" size="sm" title="Add Content" startIcon={<Plus size="md" />} onclick={() => setCloseModel(true)} />
              <Button varient="greendark" size="sm" title="Share Think" startIcon={<Share size="md" />} onclick={getLink} />
              <Button varient="greendark" size="sm" title="Log-out" onclick={logout} />
            </div>
            <div className="absolute mt-20 mr-10">
              <LinkModel linkopen={link} closelink={() => setLink(false)} newLinkValue={linkvalue} />
            </div>
          </div>
          <div className="bg-green-900 h-min-screen mt-12">
            <div className="flex gap-4 pt-8 flex-wrap justify-center sm:justify-center mr-4 mt-2">
              {filteredData.map(({ type, link, title, _id }) => (
                <Card title={title} link={link} type={type} key={_id} contentId={_id} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-900 flex justify-start min-h-screen">
          <div className="min-h-screen w-24">
            <SideBar onTypeSelect={setSelectedType} />
          </div>
          <div className="min-h-screen sm:w-full">
            <ContentModal open={openModel} close={() => setCloseModel(false)} />
            <div className="flex justify-end gap-4 sm:pt-4 pr-2 ml-8">
              <div className="flex justify-end sm:gap-4 right-0 fixed w-5/6 p-5 top-0 bg-green-900">
                <Button varient="greenlight" size="sm" title="Add Content" startIcon={<Plus size="md" />} onclick={() => setCloseModel(true)} />
                <Button varient="greendark" size="sm" title="Share Brain" startIcon={<Share size="md" />} onclick={getLink} />
                <Button varient="greendark" size="sm" title="Log-out" onclick={logout} />
              </div>
              <div className="absolute mt-20 mr-10">
                <LinkModel linkopen={link} closelink={() => setLink(false)} newLinkValue={linkvalue} />
              </div>
            </div>
            <div className="flex gap-4 pt-8 flex-wrap justify-center mr-4 mt-4 sm:mt-10">
              {filteredData.map(({ type, link, title, _id }) => (
                <Card title={title} link={link} type={type} key={_id} contentId={_id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
