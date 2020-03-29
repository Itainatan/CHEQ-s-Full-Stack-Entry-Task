import styled from "styled-components";

export const ButtonStyle = styled.button`
  background-color: #FF007F; 
  margin-right: 5px;
  padding: 5px;
  }
`;
export const AStyle = styled.a`
  color: #FF007F; 
  margin-right: 5px;
  padding: 5px;
  }
`;

export const Square = styled.td`
  padding: 10px;
  font-size: 0.875rem;
  text-align: left;
  line-height: 1.43;
  border: 1px solid rgba(224, 224, 224, 1);
  }
`;

export const SquareHedear = styled(Square)`
  font-weight: 700;
  line-height: 1.5rem;
  }
`;

export const Head = styled.h1`
  text-align: left;
  color:  #FF007F; 
  }
`;

export const Label = styled.div`
  padding: 5px;
  font-weight: 700;
  line-height: 1.5rem;
  margin-bottom: 10px;
  }
`;

export const LabelReq = styled(Label)`
::after { 
  content: " * ";
  color: red;
  font-weight: bold;
}
  }
`;

export const Message = styled.div`
  color: red;
  margin: 10px;
  font-size: 20px;
  }
`;