import React, { useState } from 'react';
import Stripe from './index';
import { Button, Container } from '../../components/index';
import Accordion, {
  AccordionItemBody,
} from '../../components/Accordion/Accordion';
import { Link } from 'react-router-dom';
import { SubBox, Confirmation, Header } from './Billing.Styling';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';

export const BillingContext = React.createContext({
  setConfirm: null as any,
  setShownIndex: null as any,
});

const Billing = () => {
  const [confirm, setConfirm] = useState<any>({});
  const [shownIndex, setShownIndex] = useState(1);

  return (
    <Container>
      <Header>Billing</Header>
      <SubBox>
        <BillingContext.Provider value={{ setConfirm, setShownIndex }}>
          <Accordion index={shownIndex} setIndex={setShownIndex}>
            <title>Choose your plan!! 💰</title>
            <AccordionItemBody>
              <Stripe />
            </AccordionItemBody>

            <title>All the confirmations 😇</title>
            <AccordionItemBody>
              {!!(confirm.confirm && confirm.confirm.plan) ? (
                <>
                  <h3>Thank you for subscribing to Lodgel Professional!</h3>
                  <Confirmation>
                    <Link to='/properties'>
                      <Button text='Take me to my properties!' />
                    </Link>
                  </Confirmation>
                </>
              ) : null}
            </AccordionItemBody>
          </Accordion>
          <div
            style={{
              border: 'var(--border)',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '0',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '50%',
                background: 'white',
              }}
            >
              <List style={{ padding: '0' }}>
                <ListSubheader
                  classes={{}}
                  style={{
                    background: 'var(--color-bg-main)',
                    borderBottom: 'var(--border)',
                    height: '62px',
                    padding: '0.5rem',
                  }}
                >
                  <h3 style={{ margin: '0' }}>Lodgel Basic</h3>
                </ListSubheader>
                <ListItem>
                  <Avatar>
                    <i className='fas fa-check-square' />
                  </Avatar>
                  <ListItemText
                    primary='One Month Free Trial'
                    secondary='Risk free trial'
                  />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <i className='fas fa-dollar-sign' />
                  </Avatar>
                  <ListItemText
                    primary='We help you make money'
                    secondary='Our users save an average of 20% of their time invested managing their properties!'
                  />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <i className='fas fa-percentage' />
                  </Avatar>
                  <ListItemText
                    primary='Charge 1.5% of Earnings'
                    secondary='Once you’re happy and making money, we charge 1% of booking earnings.'
                  />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <i className='fas fa-hashtag' />
                  </Avatar>
                  <ListItemText
                    primary='Up to 5 properties'
                    secondary='Scale up your rental business without risks and as convenient as possible'
                  />
                </ListItem>
              </List>
            </div>
            <div
              style={{
                width: '100%',
                height: '50%',
                border: 'var(--border)',
                background: 'white',
              }}
            >
              <List style={{ padding: '0' }}>
                <ListSubheader
                  style={{
                    background: 'var(--color-bg-main)',
                    borderBottom: 'var(--border)',
                    height: '62px',
                    padding: '0.5rem',
                  }}
                >
                  <h3 style={{ margin: '0' }}>Lodgel Professional</h3>
                </ListSubheader>
                <ListItem>
                  <Avatar>
                    <i className='fas fa-check-square' />
                  </Avatar>
                  <ListItemText
                    primary='One Month Free Trial'
                    secondary='Risk free trial'
                  />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <i className='fas fa-dollar-sign' />
                  </Avatar>
                  <ListItemText
                    primary='We help you make money'
                    secondary='Our users save an average of 20% of their time invested managing their properties!'
                  />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <i className='fas fa-percentage' />
                  </Avatar>
                  <ListItemText
                    primary='Charge 1% of Earnings'
                    secondary='Once you’re happy and making money, we charge 1% of booking earnings.'
                  />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <i className='fas fa-hashtag' />
                  </Avatar>
                  <ListItemText
                    primary='Unlimited amount of properties'
                    secondary='Scale your business effortlessly with Lodgel!'
                  />
                </ListItem>
              </List>
            </div>
          </div>
        </BillingContext.Provider>
      </SubBox>
    </Container>
  );
};

export default Billing;
