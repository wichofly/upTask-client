import type { TeamMember } from '../../types';

type SearchResultProps = {
  user: TeamMember;
};

export const SearchResult = ({ user }: SearchResultProps) => {
  return (
    <>
      <p className="mt-10 text-center font-semibold">Result:</p>
      <div className="flex justify-between items-center">
        <p>{user.name}</p>
        <button className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-normal cursor-pointer rounded-md transition-colors duration-300">
          Add to project
        </button>
      </div>
    </>
  );
};
