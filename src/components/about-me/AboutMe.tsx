import { Card } from "flowbite-react";
import { GrPhone, GrMailOption } from "react-icons/gr";
import { ABOUT_ME } from "../../constants/locals/en-Us.constants";
import cvData from "./about-me.json";
import UserAvatar from "../shared/UserAvatar";

export default function AboutMe(): JSX.Element {
  return (
    <>
      <div className="flex p-2 text-start">
        <h2 className="text-2xl font-bold">{ABOUT_ME.TITLE}</h2>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-10">
          <Card>
            <div className="flex flex-col gap-2 h-full justify-start">
              <UserAvatar firstName={cvData.name[0]} lastName={cvData.name[1]} photo={cvData.photo}></UserAvatar>
              <div className="text-xl font-bold font-medium">
                <h2>{cvData.name}</h2>
              </div>
              <div className="flex gap-2 items-center px-2 py-1 rounded-full text-xs bg-indigo-600">
                <GrMailOption />
                {cvData.contact.email}
              </div>
              <div className="flex gap-2 items-center px-2 py-1 rounded-full text-xs bg-indigo-600">
                <GrPhone />
                {cvData.contact.phone}
              </div>
            </div>
          </Card>

          <Card className="flex-1">
            <div className="flex flex-col gap-2">
              <p>{cvData.skills}</p>
            </div>

            <h3 className="text-start font-bold">EXPIRENECE</h3>
            <div className="flex flex-col gap-10 text-start items-start">
              
              {cvData.experience.map(job => {
                return (
                <div>
                  <div className="font-semibold">{job.date_range} | {job.title}</div>
                  <div className="font-bold">{job.company}</div>
                  <div className="flex">
                  <ul>
              {job.description.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
                  </div>
                  </div>
                  )
              })}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
