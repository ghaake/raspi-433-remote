import { exec } from "child_process";

import { Router, Request, Response } from 'express';
import { getCommands, updateState } from "../../store/store";

const router = Router();

const command = process.env.CODESEND_COMMAND || "/opt/RF/codesend";
const codeLookup = getCommands();

type Body = {
    on: boolean
}

router.put( "/v1/state/:id", ( req: Request, res: Response ) => {
    const id = req.params.id;
    const body: Body = req.body;
    
    const code = codeLookup[id];
    if( !code )
    {
        res.status( 400 ).send( "err" );
        return;
    }
    
    exec( `${command} ${body.on ? code.on : code.off}` );
    updateState( id, body.on );
    res.status( 200 ).send( "ok" );
    return;
} );

export default router;