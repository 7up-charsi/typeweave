type FocusableTarget = HTMLElement | { focus(): void };

export const focusFirst = (
  elements: HTMLElement[],
  { select = false } = {},
) => {
  const previouslyFocusedElement = document?.activeElement;

  elements = elements.filter((ele) => !(ele instanceof HTMLAnchorElement));

  for (const ele of elements) {
    focus(ele, { select });

    // if statement is true, then focus moved
    if (document?.activeElement !== previouslyFocusedElement) return;
  }
};

export const getTabbables = (container: HTMLElement) => {
  const nodes: HTMLElement[] = [];

  const walker = document?.createTreeWalker(
    container,
    NodeFilter.SHOW_ELEMENT,
    (node) => {
      if (!(node instanceof HTMLElement)) return NodeFilter.FILTER_REJECT;

      if (
        (node as unknown as { disabled: boolean }).disabled ||
        node.hidden ||
        (node.tagName === 'INPUT' && node.hidden)
      )
        return NodeFilter.FILTER_SKIP;

      return node.tabIndex >= 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
  );

  while (walker.nextNode()) nodes.push(walker.currentNode as HTMLElement);

  return nodes;
};

export const isHidden = (
  node: HTMLElement,
  { upTo }: { upTo?: HTMLElement } = {},
) => {
  if (getComputedStyle(node).visibility === 'hidden') return true;

  let _node = node;

  while (_node) {
    if (upTo !== undefined && _node === upTo) return false;
    if (getComputedStyle(_node).display === 'none') return true;

    _node = _node.parentElement as HTMLElement;
  }

  return false;
};

export const focus = (
  element: FocusableTarget | null,
  { select }: { select?: boolean } = {},
) => {
  if (element && element.focus) {
    const previousFocusedElement = document?.activeElement;

    element.focus({ preventScroll: true });

    if (
      element !== previousFocusedElement &&
      (element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement) &&
      'select' in element &&
      select
    ) {
      element.select();
    }
  }
};
