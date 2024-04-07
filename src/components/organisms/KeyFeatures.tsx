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
            "Inariam enables users to access multiple cloud providers using a single sign-on (SSO) process, enhancing user experience and security."
          }
        />{" "}
        <KeyCard
          Title={"Comprehensive Role and Permission Management"}
          Image={Permission.src}
          Description={
            "Inariam provides a central hub for defining roles, assigning granular permissions, and enforcing compliance across different cloud providers."
          }
        />{" "}
        <KeyCard
          Title={"Enhanced Security and Compliance"}
          Image={Security.src}
          Description={
            "Inariam incorporates a robust security and compliance engine to enforce rules, validate permissions, and ensure adherence to organizational and industry standards."
          }
        />{" "}
        <KeyCard
          Title={"Efficient User Management"}
          Image={manage.src}
          Description={
            "Inariam aims to simplify the creation, modification, and deletion of user accounts, along with the assignment of roles and permissions, ensuring seamless user administration."
          }
        />
        <KeyCard
          Title={"Multi-Cloud Integration"}
          Image={cloud.src}
          Description={
            "Inariam enables organizations to interact with Azure, GCP, and AWS through a unified interface, streamlining user management and permissions across various cloud environments."
          }
        />
        <KeyCard
          Title={"Template-Based Workflow"}
          Image={template.src}
          Description={
            "The project offers pre-ready templates for user, group, and role creation, promoting consistency, efficiency, and adherence to best practices."
          }
        />
        <KeyCard
          Title={"Monitoring and Reporting"}
          Image={monitoring.src}
          Description={
            "Inariam includes monitoring capabilities to scan for vulnerabilities, identify potential threats, and provide timely reporting to administrators."
          }
        />{" "}
        <KeyCard
          Title={"Stakeholders and Roles"}
          Image={role.src}
          Description={
            "The success of the inariam project depends on the collaborative efforts of various stakeholders:"
          }
        />
      </div>
    </main>
  )
}

export default KeyFeatures
