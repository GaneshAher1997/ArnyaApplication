import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import Home from "../screen/Home";
import PersonalDetails from "../screen/Staff Management/PersonalDetails";
import Education from "../screen/Staff Management/Education";
import WorkExperience from "../screen/Staff Management/WorkExperience";
import DrawerNavigator from "./DrawerNavigation";
import EnclosureForm from "../screen/Encloser/EnclosureForm";
import UserForm from "../screen/Staff Management/UserForm";
import UserIdForm from "../screen/Staff Management/UserIdForm";
import Enclosure from "../screen/Master/Enclosure";
import AddDiagnosis from "../screen/Master/Medical/AddDiagnosis";
import ManageAffectedParts from "../screen/Master/Medical/ManageAffectedParts";
import AddFeedingFactors from "../screen/Master/Kitchen/AddFeedingFactors";
import AddFeedingPlaters from "../screen/Master/Kitchen/AddFeedingPlaters";
import AddMealSlots from "../screen/Master/Kitchen/AddMealSlots";
import AddEnclosureType from "../screen/Master/AddEnclosureType (1)";
import AddincidentType from "../screen/Master/AddincidentType";
import TagAssign from "../screen/Master/TagAssign";
import AddTag from "../screen/Master/AddTag";
import AddTagGroup from "../screen/Master/AddTagGroup";
import AddFeedTypes from "../screen/Master/AddFeedTypes";
import Foods from "../screen/Master/Foods";
import Section from "../screen/Section/CreateSection";
import ListSection from "../screen/Section/ListSection";
import EditSection from "../screen/Section/EditSection";

import CreateZoo from "../screen/Staff Management/CreateZoo";
import EducationType from "../screen/Staff Management/EducationType";
import GetEducationType from "../screen/Staff Management/getEducationType";
import EmpDepartment from "../screen/Employee_department/EmpDepartment";
import CreateZooSite from "../screen/Employee_department/CreateZooSite";
import ClientIdForm from "../screen/Client id/ClientIdForm";
import ListClientIdProof from "../screen/Client id/ListClientIdProof";
import Department from "../screen/Employee_department/Department";
import Designation from "../screen/Employee_department/Designation";
import AssignUserSite from "../screen/Staff Management/AssignUserSite";
import AssignUserSection from "../screen/Staff Management/AssignUserSection";
import GetClientidProof from "../screen/Client id/GetClientidProof";
import ShowPersonalDetails from "../screen/Staff Management/ShowPersonalDetails";
import GetDeptItem from '../screen/Employee_department/GetDeptItem';
import DesignationDetail from "../screen/Employee_department/DesignationDetail";
import CreateDesignation from "../screen/Employee_department/CreateDesignation";
import ListDepartment from "../screen/User/Department/ListDepartment";
import AddDepartment from "../screen/User/Department/AddDepartment";
import ZoneListByZooId from "../screen/Staff Management/ZoneListByZooId";
import CreateEnclosure from "../screen/Encloser/CreateEnclosure";
import EnclosureList from "../screen/Encloser/EnclosureList";
import EnclosureDetails from "../screen/Encloser/EnclosureDetails";
import ListEggFertility from "../screen/User/Egg Fertility/ListEggFertility";
import AddEggFertility from "../screen/User/Egg Fertility/AddEggFertility";
import GetEggFertility from "../screen/User/Egg Fertility/GetEggFertility";
import ListAccession from "../screen/User/Accession_Type/ListAccession";
import AddAccession from "../screen/User/Accession_Type/AddAccession";
import GetAccession from "../screen/User/Accession_Type/GetAccession";
import AddExperience from "../screen/User/Experience/AddExperience";
import GetExperience from "../screen/User/Experience/GetExperience";
import Listeducation from "../screen/User/Education/Listeducation";
import CreateEducation from "../screen/User/Education/CreateEducation";
import AddHatchedStatus from "../screen/User/Hatched/AddHatchedStatus";
import ListAllHatchedStatus from "../screen/User/Hatched/ListAllHatchedStatus";
import GetHatchedStatus from "../screen/User/Hatched/GetHatchedStatus";
import UserCreateSection from "../screen/User/SectionComponents/UserCreateSection";
import GetSection from "../screen/User/SectionComponents/GetSection";
import CreateSite from "../screen/User/Sites/CreateSite";
import ListSite from "../screen/User/Sites/ListSite";
import AddIdProof from "../screen/User/IdProof/AddIdProof";
import GetIdProof from "../screen/User/IdProof/GetIdProof";
import AddStaff from "../screen/Staff Management/AddStaff";
import UserDetails from "../screen/Staff Management/UserDetails";
import CreateZone from "../screen/Master/CreateZone";
import ListStaff from "../screen/Staff Management/ListStaff";
import AddFeedLog from "../screen/Feed/AddFeedLog";
import SearchScreen from "../screen/SearchScreen";
import Master from "../screen/MasterComponents/Master";
import EggsAddDynamicForm from "../screen/Eggs/EggsAddDynamicForm";
import EggsAddForm from "../screen/Eggs/EggsAddForm";
import EditEggForm from "../screen/Eggs/EditEggForm";
import EggDetails from "../screen/Eggs/EggDetails";
import AnimalMovement from "../screen/Encloser/AnimalMovement";
import AnimalAddForm from "../screen/Animals/AnimalAddForm";
import AnimalsAdd from "../screen/Others/AnimalsAdd";
import AnimalList from "../screen/Animals/AnimalList";
import Accession from "../screen/Accession/Accession";
import EggLists from "../screen/Eggs/EggLists";
import AddDisposition from "../screen/Animals/AddDisposition";
import AnimalsDetails from "../screen/Animals/AnimalsDetails";
import BottomTabNav from "./BottomTabNavigation";
import Collections from "../screen/Insights/Collection";
import OrderHierarchy from "../screen/Insights/OrderHierarchy";
import FamilyHierarchy from "../screen/Insights/FamilyHierarchy";
import GenusHierarchy from "../screen/Insights/GenusHierarchy";
import SpeciesHierarchy from "../screen/Insights/SpeciesHierarchy";
import ComonNameDetails from "../screen/Insights/ComonNameDetails";
import Advice from "../screen/Medical/Advice";
import CaseType from "../screen/Medical/CaseType";
import AddMedical from "../screen/Medical/AddMedical";
import Complaints from "../screen/Medical/Complaints";
import AnimalEnclosure from "../screen/Encloser/AnimalEnclosure";
import ApprovalTask from "../screen/Approval/ApprovalTask";
import Searchanimal from "../screen/Medical/Searchanimal";
import ConureSearch from "../screen/Medical/ConureSearch";
import Rx from "../screen/Medical/Rx";
import Diagnosis from "../screen/Medical/Diagnosis";

import ChatsScreen from '../screen/ChatModule/screen/ChatsScreen'
import ChatScreen from '../screen/ChatModule/screen/ChatScreen'
import AnimalEdit from "../screen/Animals/AnimalEdit";
import EditSite from "../screen/User/Sites/EditSite"
import EnclosureEdit from "../screen/Encloser/EnclosureEdit";
import SearchTransferanimal from "../screen/Encloser/SearchTransferanimal"
import InsightAnimalSelect from "../screen/Encloser/InsightAnimalSelect"
import Housing from "../screen/housing/Housing";
import OccupantScreen from "../screen/housing/OccupantScreen"
import HousingEnclouser from "../screen/housing/HousingEnclouser";
import HousingSearch from "../screen/housing/HousingSearch";
import SearchAnimDestination from "../screen/Encloser/SearchAnimDestination"
import MoveAnimalSearch from "../screen/Encloser/MoveAnimalSearch";
import SearchedState from "../screen/Encloser/SearchedState"
import InsightSearching from "../screen/Insights/InsightSearching";
import SelectApprover from "../screen/Encloser/SelectApprover"

const Stack = createStackNavigator();

const MainStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00B386",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="BottomTabNav" component={BottomTabNav} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
      <Stack.Screen name="UserForm" component={UserForm} />
      <Stack.Screen name="AddStaff" component={AddStaff} />
      <Stack.Screen name="ListStaff" component={ListStaff} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="UserIdForm" component={UserIdForm} />
      <Stack.Screen name="AddEncloser" component={EnclosureForm} />
      <Stack.Screen name="Education" component={Education} />
      <Stack.Screen name="WorkExperience" component={WorkExperience} />
      <Stack.Screen name="Enclosure" component={Enclosure} />
      <Stack.Screen name="AddDiagnosis" component={AddDiagnosis} />
      <Stack.Screen
        name="ManageAffectedParts"
        component={ManageAffectedParts}
      />
      <Stack.Screen name="AddFeedingFactors" component={AddFeedingFactors} />
      <Stack.Screen name="AddFeedingPlaters" component={AddFeedingPlaters} />
      <Stack.Screen name="AddMealSlots" component={AddMealSlots} />
      <Stack.Screen name="AddEnclosureType" component={AddEnclosureType} />
      <Stack.Screen name="AddFeedTypes" component={AddFeedTypes} />
      <Stack.Screen name="AddincidentType" component={AddincidentType} />
      <Stack.Screen name="AddTagAssign" component={TagAssign} />
      <Stack.Screen name="AddTag" component={AddTag} />
      <Stack.Screen name="AddTagGroup" component={AddTagGroup} />
      <Stack.Screen name="Foods" component={Foods} />
      <Stack.Screen name="Section" component={Section} />
      <Stack.Screen name="ListSection" component={ListSection} />
      <Stack.Screen name="EditSection" component={EditSection} />

      <Stack.Screen name="CreateZoo" component={CreateZoo} />
      <Stack.Screen name="EducationType" component={EducationType} />
      <Stack.Screen name="GetEducationType" component={GetEducationType} />
      <Stack.Screen name="empDepartment" component={EmpDepartment} />
      <Stack.Screen name="AddZooSite" component={CreateZooSite} />
      <Stack.Screen name="CreateZone" component={CreateZone} />
      <Stack.Screen name="ClientIdproof" component={ClientIdForm} />
      <Stack.Screen name="ListClientId" component={ListClientIdProof} />
      <Stack.Screen name="Department" component={Department} />
      <Stack.Screen name="AssignUserSite" component={AssignUserSite} />
      <Stack.Screen name="AssignUserSection" component={AssignUserSection} />
      <Stack.Screen name="GetClientidProof" component={GetClientidProof} />
      <Stack.Screen name="ShowPersonalDetails" component={ShowPersonalDetails} />
      <Stack.Screen name="departmentById" component={GetDeptItem} />
      <Stack.Screen name="Designation" component={Designation} />
      <Stack.Screen name="DesignationDetail" component={DesignationDetail} />
      <Stack.Screen name="CreateDesignation" component={CreateDesignation} />
      <Stack.Screen name="ZoneListByZooId" component={ZoneListByZooId} />

      <Stack.Screen name="ListDepartment" component={ListDepartment} />
      <Stack.Screen name="AddDepartment" component={AddDepartment} />

      <Stack.Screen name="CreateEnclosure" component={CreateEnclosure} />
      <Stack.Screen name="EnclosureEdit" component={EnclosureEdit} />

      <Stack.Screen name="EnclosureList" component={EnclosureList} />
      <Stack.Screen name="EnclosureDetails" component={EnclosureDetails} />
      <Stack.Screen name="AnimalMovement" component={AnimalMovement} />
      <Stack.Screen name="ListEggFertility" component={ListEggFertility} />
      <Stack.Screen name="AddEggFertility" component={AddEggFertility} />
      <Stack.Screen name="GetEggFertility" component={GetEggFertility} />

      <Stack.Screen name="ListAccessionType" component={ListAccession} />
      <Stack.Screen name="Accession" component={Accession} />
      <Stack.Screen name="AddAccessionType" component={AddAccession} />
      <Stack.Screen name="GetAccessionType" component={GetAccession} />

      <Stack.Screen name="GetExperience" component={GetExperience} />
      <Stack.Screen name="AddExperience" component={AddExperience} />

      <Stack.Screen name="Listeducation" component={Listeducation} />
      <Stack.Screen name="CreateEducation" component={CreateEducation} />

      <Stack.Screen name="AddHatchedStatus" component={AddHatchedStatus} />
      <Stack.Screen name="ListAllHatchedStatus" component={ListAllHatchedStatus} />
      <Stack.Screen name="GetHatchedStatus" component={GetHatchedStatus} />

      <Stack.Screen name="GetSection" component={GetSection} />
      <Stack.Screen name="UserCreateSection" component={UserCreateSection} />

      <Stack.Screen name="CreateSite" component={CreateSite} />
      <Stack.Screen name="ListSite" component={ListSite} />

      <Stack.Screen name="AddIdProof" component={AddIdProof} />
      <Stack.Screen name="GetId" component={GetIdProof} />
      <Stack.Screen name="AddFeedLog" component={AddFeedLog} />
      <Stack.Screen name="master" component={Master} />
      <Stack.Screen name="EggsAddDynamicForm" component={EggsAddDynamicForm} />
      <Stack.Screen name="AnimalAddDynamicForm" component={AnimalAddForm} />
      <Stack.Screen name="AddAnimals" component={AnimalsAdd} />
      <Stack.Screen name="AnimalsDetails" component={AnimalsDetails} />
      <Stack.Screen name="AnimalEdit" component={AnimalEdit} />

      <Stack.Screen name="AddDisposition" component={AddDisposition} />
      <Stack.Screen name="AnimalList" component={AnimalList} />
      <Stack.Screen name="EggsAddForm" component={EggsAddForm} />
      <Stack.Screen name="EditEggForm" component={EditEggForm} />
      <Stack.Screen name="EggDetails" component={EggDetails} />
      <Stack.Screen name="EggLists" component={EggLists} />
      <Stack.Screen name="Collections" component={Collections} />
      <Stack.Screen name="OrderHierarchy" component={OrderHierarchy} />
      <Stack.Screen name="GenusHierarchy" component={GenusHierarchy} />
      <Stack.Screen name="FamilyHierarchy" component={FamilyHierarchy} />
      <Stack.Screen name="SpeciesHierarchy" component={SpeciesHierarchy} />
      <Stack.Screen name="ComonNameDetails" component={ComonNameDetails} />

      {/* Medical */}
      <Stack.Screen name="AddMedical" component={AddMedical} />
      <Stack.Screen name="Advice" component={Advice} />
      <Stack.Screen name="CaseType" component={CaseType} />
      <Stack.Screen name="Complaints" component={Complaints} />
      <Stack.Screen name="Rx" component={Rx} />
      <Stack.Screen name="Diagnosis" component={Diagnosis} />
      <Stack.Screen name="Searchanimal" component={Searchanimal} />
      <Stack.Screen name="ConureSearch" component={ConureSearch} />



      <Stack.Screen name="AnimalEnclosure" component={AnimalEnclosure} />
      <Stack.Screen name="ApprovalTask" component={ApprovalTask} />
      <Stack.Screen name="ChatList" component={ChatsScreen } />
      <Stack.Screen name="Chats" component={ChatScreen } />
      <Stack.Screen name="AnimalEditPage" component={AnimalEdit } />
      <Stack.Screen name="EditSite" component={EditSite } />
      <Stack.Screen name="Housing" component={Housing } />
      <Stack.Screen name="OccupantScreen" component={OccupantScreen } />
      <Stack.Screen name="HousingEnclosuer" component={HousingEnclouser } />
      <Stack.Screen name="HousingSearch" component={HousingSearch } />
      <Stack.Screen name="SearchTransferanimal" component={SearchTransferanimal } />
      <Stack.Screen name="InsightAnimalSelect" component={InsightAnimalSelect}/>
      <Stack.Screen name="SearchAnimDestination" component={SearchAnimDestination}/>
      <Stack.Screen name="MoveAnimalSearch" component={MoveAnimalSearch}/>
      <Stack.Screen name="SearchedState" component={SearchedState}/>
      <Stack.Screen name="InsightSearching" component={InsightSearching } />
      <Stack.Screen name="SelectApprover" component={SelectApprover } />
    </Stack.Navigator>
  );
};

export default MainStackNavigation;
