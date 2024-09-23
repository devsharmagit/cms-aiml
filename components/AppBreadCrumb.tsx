import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadCrumbPropType {
  links: {
    title: string;
    link: string;
  }[];
}

export function AppBreadCrumb({ links }: BreadCrumbPropType) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {links.map(({ link, title }, index) => {
          if (index + 1 === links.length) {
            return (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem key={title}>
                  <BreadcrumbPage> {title} </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            );
          }
          return (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem key={title}>
                <BreadcrumbLink href={link}> {title} </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
