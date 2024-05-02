import Computer from "../../../public/ManOnComputer.svg"
import Permission from "./../../../public/Permissions.svg"
import Security from "./../../../public/Security.svg"
import cloud from "./../../../public/multiCloud.svg"
import monitoring from "./../../../public/monitor.svg"
import template from "./../../../public/Template.svg"
import manage from "./../../../public/manage.svg"
import role from "./../../../public/roles.svg"
import { Title } from "./../atoms"
import { KeyCard } from "../molecules"
const KeyFeatures = ({ ...props }) => {
  return (
    <main className="w-full max-w-6xl m-auto h-auto  ">
      <Title> Our Key Features</Title>

      <div className="w-full h-auto flex flex-wrap py-2 md:gap-10 items-center justify-center">
        <KeyCard
          Title={"Seamless Single Sign-On (SSO)"}
          Image={Computer.src}
          Description={
            "this project enables users to access multiple cloud providers using a single sign-on (SSO) process, enhancing user experience and security."
          }
        />{" "}
        
        <KeyCard
          Title={"Enhanced Security and Compliance"}
          Image={Security.src}
          Description={
            "this project incorporates a robust security and compliance engine to enforce rules, validate permissions, and ensure adherence to organizational and industry standards."
          }
        />{" "}
        <KeyCard
          Title={"Efficient User Management"}
          Image={manage.src}
          Description={
            "this project aims to simplify the creation, modification, and deletion of Cloud Ressources, along with the assignment of roles and permissions, ensuring seamless user administration."
          }
        />
        <KeyCard
          Title={"Multi-Cloud Integration"}
          Image={cloud.src}
          Description={
            "this project enables organizations to interact with Azure, GCP, and IBM through a unified interface, streamlining user management and permissions across various cloud environments."
          }
        />
        <KeyCard
          Title={"Template-Based Workflow"}
          Image={template.src}
          Description={
            "The project offers pre-ready terraform templates for ressources creation, promoting consistency, efficiency, and adherence to best practices."
          }
        />
        
        <KeyCard
          Title={"Stakeholders and Roles"}
          Image={role.src}
          Description={
            "The success of this project depends on the collaborative efforts of various stakeholders:"
          }
        />
      </div>
    </main>
  )
}

export default KeyFeatures
