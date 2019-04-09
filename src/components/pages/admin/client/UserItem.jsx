import React from 'react';
import { Link } from 'react-router-dom';
import {
  Item,
  ImageItem,
  TextItem,
  TextName,
  Text,
  TextValue,
  Image,
  ItemNotify
} from '../../../../styles/components/client/item';

export default function UserItem({ id, fullName, avatar, timeBank, planText, notify = 0 }) {
  return (
    <Link
      to={{
        pathname: `/clients/${id}`
      }}
    >
      <Item>
        <ImageItem>
          <Image alt={fullName} src={avatar} />
          {notify !== 0 ? <ItemNotify>{notify}</ItemNotify> : null}
        </ImageItem>
        <TextItem>
          <TextName>{fullName}</TextName>
          <Text>Time Bank</Text>
          <TextValue>{timeBank} mins</TextValue>
          {/* <Text>Subscription</Text>
          <TextValue>{planText}</TextValue> */}
        </TextItem>
      </Item>
    </Link>
  );
}

