"use client";
import { useEffect, useState } from "react";
import customAxios from "@/lib/axiosInterceptor";
import { API_ENDPOINT_FOR_SKILL } from "@/lib/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { useSelector, useDispatch } from "react-redux";
import { setSkill } from "@/redux/skillSlice";
import { RootState } from "@/redux/store";

const AddSkills = ({
  selectedSkills,
  setSelectedSkills,
}: {
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
}) => {
  const dispatch = useDispatch();
  const skills = useSelector((state: RootState) => state.skill);

  useEffect(() => {
    console.log("selectedSkills", selectedSkills);
  }, [selectedSkills]);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await customAxios.get(API_ENDPOINT_FOR_SKILL);
        dispatch(setSkill(response.data));
      } catch (error: any) {
        console.error("error while fetching skills = ", error);
      }
    }
    fetchSkills();
  }, []);

  return (
    <div className="items-top flex space-x-2">
      {skills.map((skill) => {
        return (
          <div className="items-top flex space-x-2" key={skill.skillId}>
            <SkillCheckbox
              id={skill.skillId}
              selectedSkills={selectedSkills}
              setSelectedSkills={setSelectedSkills}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor={skill.skillId}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {skill.skillName}
              </label>
              <p className="text-sm text-muted-foreground">
                {skill.skillDescription}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SkillCheckbox = ({
  id,
  selectedSkills,
  setSelectedSkills,
}: {
  id: string;
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
}) => {
  function handleOnChange() {
    console.log("clicked", id);
    if (selectedSkills.includes(id)) {
      setSelectedSkills(selectedSkills.filter((skill) => skill !== id));
    } else {
      setSelectedSkills([...selectedSkills, id]);
    }
  }
  return <Checkbox id={id} onClick={handleOnChange} />;
};

export default AddSkills;
