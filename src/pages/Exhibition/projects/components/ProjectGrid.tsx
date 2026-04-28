import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PROJECTS_GREENBEE } from '../../data/ProjectGreenbee';
import { PROJECTS_DROMAPIC } from '../../data/ProjectDromapic';
import { PROJECTS_IRAY } from '../../data/ProjectIray';
import { PROJECTS_YADZ } from '../../data/ProjectYadz';
import { PROJECTS_ADRENALIN } from '../../data/ProjectAdrenalin';
import { PROJECTS_PROTO } from '../../data/ProjectProto';
import { PROJECTS_HYPHEN } from '../../data/ProjectHyphen';
import { PROJECTS_HANGULGGOL } from '../../data/ProjectHangulggol';
import { PROJECTS_HIPS } from '../../data/ProjectHips';

const SUPABASE_URL =
  'https://qlxpkabuqlhllqtcczhl.supabase.co/storage/v1/object/public/projects/';

interface PaginationProps {
  $active?: boolean;
}

interface ProjectGridProps {
  activeClub: string;
  onProjectClick: (project: any) => void;
  selectedProject?: any;
}

const CLUB_DATA_MAP: Record<string, any[]> = {
  greenbee: PROJECTS_GREENBEE,
  dromapic: PROJECTS_DROMAPIC,
  iray: PROJECTS_IRAY,
  yadz: PROJECTS_YADZ,
  adrenalin: PROJECTS_ADRENALIN,
  proto: PROJECTS_PROTO,
  hyphen: PROJECTS_HYPHEN,
  hangulggol: PROJECTS_HANGULGGOL,
  hips: PROJECTS_HIPS,
};

const ContentContainer = styled.div`
  width: 100%;
  min-height: 80vh;
  margin-top: 10ch;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: calc((100vw - (40px * 2) - (20px * 4)) / 5);
  gap: 40px 20px;
  padding: 40px;
  min-height: calc(
    ((100vw - (40px * 2) - (20px * 4)) / 5) * 2 + (40px * 2) + 40px
  );
`;

const ProjectCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
`;

const ImageWrapper = styled.div<{ $isActive?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme, $isActive }) =>
      $isActive
        ? 'transparent'
        : `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, ${theme.colors.redShimmer} 100%)`};

    opacity: ${({ $isActive }) => ($isActive ? 0 : 1)};
    transition: opacity 0.2s ease-in-out;
  }

  ${ProjectCard}:hover &::after {
    opacity: 0;
  }
`;

const Info = styled.div<{ $isActive?: boolean }>`
  position: absolute;
  bottom: 15px;
  left: 15px;
  right: 15px;
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : 'white')};
  z-index: 2;
  font-weight: 800;
  font-size: 1.5rem;

  .author {
  }

  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    width: 100%;
    display: block;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
  padding-bottom: 40px;
`;

const PageNumber = styled.span<PaginationProps>`
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) => (props.$active ? '#aeaeae' : '#000')};
`;

const ProjectGrid = ({
  activeClub,
  onProjectClick,
  selectedProject,
}: ProjectGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeClub]);

  const projects = CLUB_DATA_MAP[activeClub] || [];

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  const currentProjects = Array.isArray(projects)
    ? projects.slice(indexOfFirstProject, indexOfLastProject)
    : [];

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handleCardClick = (project: any) => {
    onProjectClick(project);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ContentContainer>
      <GridContainer>
        {currentProjects.map((project, index) => {
          const isActive =
            selectedProject &&
            selectedProject.author === project.author &&
            selectedProject.title === project.title;

          const imageList: string[] =
            typeof project?.imgName === 'string'
              ? project.imgName.trim().split(/[\n,]+/)
              : [];

          const thumbnailImage = imageList.find((img: string) =>
            img.toLowerCase().includes('thumbnail'),
          );

          //   const finalDisplayImage = thumbnailImage || imageList[0] || '';
          const finalDisplayImage = thumbnailImage || '';

          const formatAuthor = (authorStr: string) => {
            if (!authorStr) return '';

            const names = authorStr
              .split(/[,]+/)
              .map((name) => name.trim())
              .filter((name) => name !== '');

            if (names.length >= 4) {
              const topThree = names.slice(0, 3).join(', ');
              return `${topThree} 외 ${names.length - 3}명`;
            }

            return authorStr;
          };

          return (
            <ProjectCard
              key={`${activeClub}-${project.author || index}-${index}`}
              onClick={() => handleCardClick(project)}
            >
              <ImageWrapper $isActive={isActive}>
                {finalDisplayImage ? (
                  <img
                    src={`${SUPABASE_URL}${activeClub}/${finalDisplayImage.trim()}`}
                    alt={project.title || 'Untitled'}
                  />
                ) : (
                  <div
                    style={{
                      backgroundColor: '#eee',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                )}
              </ImageWrapper>
              <Info $isActive={isActive}>
                <div className="author">{formatAuthor(project.author)}</div>
                <div className="title">{project.title}</div>
              </Info>
            </ProjectCard>
          );
        })}
      </GridContainer>

      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageNumber
            key={i + 1}
            $active={currentPage === i + 1}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </PageNumber>
        ))}
      </Pagination>
    </ContentContainer>
  );
};

export default ProjectGrid;
