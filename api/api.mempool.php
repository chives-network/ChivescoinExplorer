<?
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Content-type: text/html; charset=utf-8");
require_once('include.inc.php');

$get_blockchain_state 	= 得到网络基本信息CACHE();
$difficulty 			= $get_blockchain_state['difficulty'];
$height 				= $get_blockchain_state['peak']['height'];
$height++;

$page 			= 参数过滤($_GET['page']);
$page			= (int)$page;
if($page=="") 	$page = 1;
$START_NUM		= ($page-1)*300;


$参数			= array();
$参数['start']	= $height-300-$START_NUM;
if($参数['start']<=0) $参数['start']=0;
$参数['end']	= $height-$START_NUM;
if($参数['end']<=0) $参数['end']=0;
$mempool_items	 		= EXECUTE_COMMAND($TYPE="full_node",$RPC="get_all_mempool_items",$参数,10);
$mempool_items		= $mempool_items['mempool_items'];

	
$rs_a 					= array();
if(count(array_keys($mempool_items))>0)								{
	foreach($mempool_items AS $KEY => $Element)				{
		$Line			= array();
		$Line['id'] 	= $KEY;
		$Line['TXID'] 	= $KEY;
		$Line['Fee'] 	= $Element['fee'];
		$Line['Amount'] 	= bcdiv($ADD_COIN['amount'],$GLOBAL_UNIT,strlen($GLOBAL_UNIT)-1);
		//print $Element['additions'][0]['puzzle_hash']."<BR>";
		
		$ADD_COIN_ARRAY 	= [];
		foreach($Element['additions'] AS $ADD_COIN)			{
			$ADD_COIN_ARRAY[] = $chiaUtils->puzzleHashToAddress($ADD_COIN['puzzle_hash'],"xcc");
		}
		$Line['From'] = join(",",$ADD_COIN_ARRAY);
		
		$DEL_COIN_ARRAY 	= [];
		foreach($Element['removals'] AS $ADD_COIN)			{
			$DEL_COIN_ARRAY[] = $chiaUtils->puzzleHashToAddress($ADD_COIN['puzzle_hash'],"xcc");
		}
		$Line['To'] = join(",",$DEL_COIN_ARRAY);
		
		if(count($ADD_COIN_ARRAY)>0)		{
			$rs_a[]		= $Line;
			$COUNTER++;
		}
	}
}


$RS = [];
$RS['code'] 	= 0;
$RS['msg']		= "";
$RS['data'] 	= $rs_a;
$RS['total'] 	= count($rs_a);
$RS['count'] 	= count($rs_a);
$RS['masternode'] = $CHIVES_MASTERNODE_STATUS;

print_R(json_encode($RS));

exit;
?>