import { Button } from '@typeweave/react/button';
import { GithubIcon } from 'lucide-react';
import React from 'react';

interface EditThisPageProps {
  path: string;
}

const displayName = 'EditThisPage';

const repoUrl = process.env.NEXT_PUBLIC_REPO_URL;

export const EditThisPage = (props: EditThisPageProps) => {
  const { path } = props;

  if (!path) throw new Error('path is not defined');
  if (!repoUrl) throw new Error('repo url is not defined');

  return (
    <Button
      asChild
      startContent={<GithubIcon />}
      className="not-prose"
    >
      <a
        href={`${repoUrl.replace(/\/+$/, '')}/edit/main/apps/docs/content/${path.replace(/^\/+/, '')}.mdx`}
        target="_blank"
      >
        Edit this page
      </a>
    </Button>
  );
};

EditThisPage.displayName = displayName;
