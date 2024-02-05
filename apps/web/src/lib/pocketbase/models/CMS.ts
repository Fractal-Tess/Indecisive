import  PocketBase  from 'pocketbase';

export async function CMS(pb: PocketBase, unit:string) {
    return await pb.collection('CMS').getFirstListItem(`unit = '${unit}'`)
}