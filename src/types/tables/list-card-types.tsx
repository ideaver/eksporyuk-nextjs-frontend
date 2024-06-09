type Icon = {
  name: string;
  color: string;
  textColor: string;
};

type RowItem = {
  name: string;
  value: string;
}

type ListItem = {
  title: string;
  icon: {
    name: string;
    color: string;
    textColor: string;
  };
  rows: RowItem[];
}
