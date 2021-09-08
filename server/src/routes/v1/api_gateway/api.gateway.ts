import axios from 'axios';
import { Router, Request, Response } from 'express';

const apiGatewayRouter = Router();

apiGatewayRouter.all('/:apiName', async (_req: Request | any, _res: Response) => {
  const apiName: string = <any>_req.params?.apiName;
  console.log(_req.file);
  const data = await axios.post(
    `http://localhost:5001/project/addProject`,
    {
      ..._req.body,
    },
    {
      ..._req,
    }
  );
  return _res.send(data.data);
});

export default apiGatewayRouter;
